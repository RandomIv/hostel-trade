import {sendRequest} from '../http';


export async function getHostels() {
    try {
        const {data} = await sendRequest({
            url: `http://localhost:5000/api/hostel`,
            method: 'GET',
        });

        return data?.hostels || [];
    } catch (error) {
        console.error('Error fetching hostels:', error);
        return [];
    }
}
