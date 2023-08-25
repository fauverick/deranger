export default function Filter_Select(props){

    return (
        <div className="filter_select">
            <label for={props.label} >{props.label.toUpperCase()}</label>
            <select name={props.label} id={props.label} onChange={props.handleChange} value = {props.value}>
                {
                    props.options.map((option) => {
                        return (
                        <option value={option}>{option.toUpperCase()}</option>

                        )
                    })
                }
            </select>
        </div>
    )
}