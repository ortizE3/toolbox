import { useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox, Libraries } from "@react-google-maps/api";
import { GoogleAutoCompleteProps } from "../../Models/ComponentProps/GoogleAutoCompleteProps";

import './GoogleAutoComplete.css';

const libraries: Libraries = ["places"];
const apiKey = import.meta.env.VITE_REACT_GOOGLE_MAPS;


const GoogleAutoComplete = (props: GoogleAutoCompleteProps) => {
    const inputRef: any = useRef(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: libraries
    });

    const onAddressChange = () => {
        props.setAddress(inputRef.current.getPlaces());
    }

    return (
        <>
            {
                isLoaded &&
                <>
                    <label htmlFor="address" >Location</label>
                    <StandaloneSearchBox onLoad={(ref) => inputRef.current = ref} onPlacesChanged={onAddressChange}>
                        <input
                            className={`google-auto-complete-input ${props.className}`}
                            type="text"
                            id="address"
                            name="address"
                            placeholder=""
                        />
                    </StandaloneSearchBox>
                </>
            }
        </>
    )
};

export default GoogleAutoComplete;