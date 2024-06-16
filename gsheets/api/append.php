<?php 
require '../../google-api-custom/vendor/autoload.php';
require 'config.php';

// configure the Google Client
$client = new \Google_Client();
$client->setApplicationName('Google Sheets API');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
// credentials.json is the key file we downloaded while setting up our Google Sheets API
$client->setAuthConfig($credentials_path);

// configure the Sheets Service
$service = new \Google_Service_Sheets($client);

$spreadsheetId = '1NtEOZO5nM5RiRGUu5rVSLJf5ZpW2fXcspGOcJHVRCfA';
$range = 'SP!3:3'; // here we use the name of the Sheet to get all the rows
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

echo json_encode($values,1);