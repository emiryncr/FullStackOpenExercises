sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a new note and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created / acknowledgment
    deactivate server

    Note right of browser: JavaScript updates the notes list without reloading the page
