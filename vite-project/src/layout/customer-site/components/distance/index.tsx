import React, { useEffect, useState } from "react";
import { getLocation } from "../../../../apis";

type Props = {
    address: any;
    distance: any;
};

const Distance = (props: Props) => {
    const [locationName, setLocationName] = useState(
        "363 Nguyễn Hữu Thọ, Khuê Trung, Cẩm Lệ, Đà Nẵng Việt Nam"
    );
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [longCurrentLocation, setLongCurrentLocation] = useState<
        number | null
    >(null);
    const [latCurrentLocation, setLatCurrentLocation] = useState<number | null>(
        null
    );
    const [number, setNumber] = useState<number | null>(0);

    useEffect(() => {
        const handleSuccess = (position: GeolocationPosition) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Xử lý dữ liệu vị trí ở đây
            setLongCurrentLocation(longitude);
            setLatCurrentLocation(latitude);
        };

        const handleError = (error: GeolocationPositionError) => {
            console.error("Lỗi khi lấy vị trí: " + error.message);
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                handleSuccess,
                handleError
            );
        } else {
            console.log("Trình duyệt không hỗ trợ geolocation.");
        }
    }, []);

    useEffect(() => {
        if (props.address !== "") {
            setLocationName(
                `${props.address.province}, ${props.address.district}, ${props.address.ward}`
            );
        }

        const local = async () => {
            const response = await getLocation(locationName);

            if (response) {
                setLatitude(parseFloat(response[0].lat));
                setLongitude(parseFloat(response[0].lon));
            }
        };

        local();
    }, [props.address, locationName]);

    useEffect(() => {
        calculateDistance();
    }, [latitude, longitude, latCurrentLocation, longCurrentLocation]);

    const calculateDistance = () => {
        if (
            latitude !== null &&
            longitude !== null &&
            latCurrentLocation !== null &&
            longCurrentLocation !== null
        ) {
            const R = 6371;
            const dLat = deg2rad(latitude - latCurrentLocation);
            const dLon = deg2rad(longitude - longCurrentLocation);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(latitude)) *
                    Math.cos(deg2rad(latCurrentLocation)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            const roundedDistance = parseFloat(distance.toFixed(1));
            setNumber(roundedDistance);
            props.distance(roundedDistance);
        }
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    return (
        <div>
            <p>Distance: {number !== null ? `${number} km` : "Chưa tính"}</p>
            <p>
                Delivery charges:{" "}
                {number !== null ? `${number * 0.5} usd` : "Chưa tính"}
            </p>
        </div>
    );
};

export default Distance;
