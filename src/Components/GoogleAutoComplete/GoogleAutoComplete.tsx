import { use, useEffect, useRef, useState } from "react";
import { useJsApiLoader, StandaloneSearchBox, Libraries } from "@react-google-maps/api";
import { GoogleAutoCompleteProps } from "../../Models/ComponentProps/GoogleAutoCompleteProps";

import './GoogleAutoComplete.css';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Address } from "../../Models/Address/Address";
import { useSelector } from "react-redux";
import { PatchDefaultUserAddress, RemoveDefaultUserAddress } from "../services/AddressService/AddressService";
import { AppState } from "../../Models/Reducer/AppState";
import { useAppDispatch } from "../../main";
import { RefreshUser } from "../../Actions/UserActions";

const libraries: Libraries = ["places"];
const apiKey = import.meta.env.VITE_REACT_GOOGLE_MAPS;


const GoogleAutoComplete = (props: GoogleAutoCompleteProps) => {
    const [googleAddress, setGoogleAddress] = useState<any>();
    const [text, setText] = useState<string>(props.address?.name ?? '');
    const user = useSelector((state: AppState) => state.user);
    const [isDefaultAddress, setDefaultAddress] = useState<boolean>();
    const appDispatch = useAppDispatch();
    const inputRef: any = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: libraries
    });

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (googleAddress && googleAddress.length > 0) {

                let addressName = googleAddress[0].formatted_address;
                const results = await getGeocode({ address: addressName });
                const { lat, lng } = await getLatLng(results[0]);
                let address: Address = { latitude: lat, longitude: lng, name: addressName };
                props.setAddress(address);
            }
        };
        fetchCoordinates();
    }, [googleAddress]);

    useEffect(() => {
        if (props.address.name) {
            setText(props.address.name)
        }
    }, [props.address])

    useEffect(() => {
        if (user && user.addressId && user.address) {
            setDefaultAddress(!!user.addressId)
            props.setAddress(user.address)
        }
    }, [user])

    const onAddressChange = () => {
        setGoogleAddress(inputRef.current.getPlaces());
    }

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (user.id && props.address) {
            let checked = event.target.checked;

            let defaultAddressPromise = null;
            let errorMessage = '';
            if (checked) {
                defaultAddressPromise = PatchDefaultUserAddress(user.id, props.address);
                errorMessage = 'error setting default address'
            } else {
                defaultAddressPromise = RemoveDefaultUserAddress(user.id);
                errorMessage = 'error removing default address'
            }

            defaultAddressPromise.then(() => {
                appDispatch(RefreshUser(user.id));
                setDefaultAddress(checked);
            }).catch(() => {
                console.error(errorMessage)
            })
        }
    }

    return (
        <>
            {
                isLoaded &&
                <>
                    <StandaloneSearchBox onLoad={(ref) => inputRef.current = ref} onPlacesChanged={onAddressChange}>
                        <input
                            className={`google-auto-complete-input ${props.className}`}
                            type="text"
                            id="address"
                            name="address"
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}
                            placeholder=""
                        />
                    </StandaloneSearchBox>
                    <div className="default-address">
                        <label>Set as Default?</label>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={isDefaultAddress}
                            disabled={props.address?.name ? false : true}
                            onChange={onCheckboxChange}></input>
                    </div>

                </>
            }
        </>
    )
};

export default GoogleAutoComplete;