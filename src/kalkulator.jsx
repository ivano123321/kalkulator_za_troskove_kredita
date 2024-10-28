import { createSignal } from "solid-js";

export default function Kalkulator(props) {


    function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.targer);
        const number = formData.get("number");
        console.log("Upisali ste broj: " + number);
 

    }
    

    return(
        <div>
            <form onSubmit={submit}>
                <input type="text" name="number" />
                <input type="submit" value="Potvrdi"/>
            </form>

        </div>
    )
}