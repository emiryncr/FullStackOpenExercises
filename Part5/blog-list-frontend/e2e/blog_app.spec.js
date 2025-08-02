import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {

    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('testpass')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('wrongpass')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('testpass')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill('Test Blog Title')
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://testblog.com')

      await page.getByRole('button', { name: 'Add' }).click()

      await expect(page.getByText('Test Blog Title Test Author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('Likeable Blog')
      await page.getByTestId('author').fill('Author')
      await page.getByTestId('url').fill('http://blog.com')
      await page.getByRole('button', { name: 'Add' }).click()

      await page.getByRole('button', { name: 'show' }).click()

      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('1 likes')).toBeVisible()
    })

    test('creator can delete a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('Blog to Delete')
      await page.getByTestId('author').fill('Author')
      await page.getByTestId('url').fill('http://blog.com')
      await page.getByRole('button', { name: 'Add' }).click()

      await page.getByRole('button', { name: 'show' }).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'delete' }).click()

      await expect(page.getByText('Blog to Delete Author')).not.toBeVisible()
    })

    test.describe('and multiple users exist', () => {
      test.beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Other User',
            username: 'otheruser',
            password: 'otherpass'
          }
        })
      })

      test('only creator sees delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title').fill('First User Blog')
        await page.getByTestId('author').fill('Author')
        await page.getByTestId('url').fill('http://blog.com')
        await page.getByRole('button', { name: 'Add' }).click()

        await page.getByRole('button', { name: 'logout' }).click()
        await page.getByTestId('username').fill('otheruser')
        await page.getByTestId('password').fill('otherpass')
        await page.getByRole('button', { name: 'login' }).click()

        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      test.only('blogs are ordered by likes descending', async ({ page, request }) => {

        const blogs = [
          { title: 'First Blog', author: 'Author 1', likes: 5 },
          { title: 'Second Blog', author: 'Author 2', likes: 10 },
          { title: 'Third Blog', author: 'Author 3', likes: 2 }
        ]

        await page.getByRole('button', { name: 'new blog' }).click()
        for (const blog of blogs) {
          await page.getByTestId('title').fill(blog.title)
          await page.getByTestId('author').fill(blog.author)
          await page.getByTestId('url').fill('http://blog.com')
          await page.getByRole('button', { name: 'Add' }).click()
          await page.waitForSelector(`text=${blog.title}`)
          await page.waitForTimeout(500)
        }

        await page.locator('.blog').filter({ hasText: 'Second Blog' }).getByRole('button', { name: 'show' }).click()
        for (let i = 0; i < 10; i++) {
          await page.locator('.blog').filter({ hasText: 'Second Blog' }).getByRole('button', { name: 'like' }).click()
          await page.waitForSelector(`text=${i + 1} likes`)
          await page.waitForTimeout(200)
        }

        await page.locator('.blog').filter({ hasText: 'First Blog' }).getByRole('button', { name: 'show' }).click()
        for (let i = 0; i < 5; i++) {
          await page.locator('.blog').filter({ hasText: 'First Blog' }).getByRole('button', { name: 'like' }).click()
          await page.waitForSelector(`text=${i + 1} likes`)
          await page.waitForTimeout(200)
        }

        await page.locator('.blog').filter({ hasText: 'Third Blog' }).getByRole('button', { name: 'show' }).click()
        for (let i = 0; i < 2; i++) {
          await page.locator('.blog').filter({ hasText: 'Third Blog' }).getByRole('button', { name: 'like' }).click()
          await page.waitForSelector(`text=${i + 1} likes`)
          await page.waitForTimeout(200)
        }

        await page.reload()

        const blogTitles = await page.locator('.blog .blog-summary').allTextContents()
        console.log('Blog order:', blogTitles)

        await expect(page.locator('.blog').first()).toContainText('Second Blog')
        await expect(page.locator('.blog').nth(1)).toContainText('First Blog')
        await expect(page.locator('.blog').last()).toContainText('Third Blog')
      })
    })
  })
})