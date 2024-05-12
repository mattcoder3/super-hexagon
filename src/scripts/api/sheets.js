import {
	apicoIntegrationId,
	spreadSheetId,
	sheetName,
	sheetId,
} from './config.js';

const API_URL = 'https://api.apico.dev/v1/';

// Call urls
const get_url = `${API_URL}${apicoIntegrationId}/${spreadSheetId}/values/${sheetName}`;
const append_url = `${API_URL}${apicoIntegrationId}/${spreadSheetId}/values/${sheetName}:append`;

// Get sample
const response = await fetch(get_url);
const data = await response.json();
console.log(data);

Append sample
function addDataValue(username, score){
	const options = {
		method: 'POST',
		url: append_url,
		params: {
			valueInputOption: 'USER_ENTERED',
			insertDataOption: 'INSERT_ROWS',
			includeValuesInResponse: true,
		},
		data: { values: [[new Date().toString(), 'Manolo', '75']] },
	};

	axios
		.request(options)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.error(error);
	});
}
