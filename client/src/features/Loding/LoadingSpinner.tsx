import "./loader.css"
function LoadingSpinner() {
    return (
        <div className="newtons-cradle opacity-60">
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
        </div>
    );
}

export default LoadingSpinner;