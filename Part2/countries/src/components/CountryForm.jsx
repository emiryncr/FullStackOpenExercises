const CountryForm = ({ cntryName, handleCntryChange }) => {
    return (
        <>
            <label htmlFor="country">Find Countries: </label>
            <input type="text" id='country' value={cntryName} onChange={handleCntryChange} />
        </>
    );
}
export default CountryForm;