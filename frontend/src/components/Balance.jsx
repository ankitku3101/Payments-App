export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-semibold text-lg">
            Your balance
        </div>
        <div className="font-bold ml-4 text-lg">
            ₹ {value}
        </div>
    </div>
}