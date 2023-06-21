# `Data` module

<p align="center">
  <img src="images/DataModule.png"/>
</p>

The data module is the very beggining of this application's workflow, allowing the ingestion of data from multiple sources and formatting it such that the others modules can operate on it seamlessly. It operates on two fronts: raw data from _.csv_ or _JSON_ files, and _JSON_ results of API calls, both of which are formatted into a standardized format through a shared workflow. As such, this module sets the basis upon which all other modules can operate.

This is an explanation of the components contained in this module and their relationship to each other and other modules.

# Team `QR2.0`
* `Giovana Kerche Bonás`
	* Responsible for architecture and development of the _File Input_ and _File Reader_ components, part of the _data from file_ pipeline.
* `Gustavo Araújo Morais`
	* Responsible for architecture and development of the _API Input_ and _API parser_ components, part of the _data from API_ pipeline.
* `João Guilherme Alves Santos`
	* Responsible for architecture and development of the _API Input_ and _API parser_ components, part of the _data from API_ pipeline.
* `Raniery Rodrigues da Silva`
	* Responsible for architecture and development of the _Type Input_ component, which is part of the process of standardization of data ingested.
* `Leonardo Livrare Martins`
	* Responsible for architecture and development of the _API Input_ and _API parser_ components, part of the _data from API_ pipeline.

# Message Types
These are the message types exchanged between components of this module and from this module to others.

**`TreatedDataContent`**

Data collected. Still needs to be typed by the _Type Input_ component
~~~json
{
	"columns": [name, ...],
	"data": [
		[column0, column1, ...],
		... // Other rows
	]
}
~~~
**`TypedDataContent`**

The standard for data storage throghout the application. Contains the name and type for each column, as well as the data that's being stored.
~~~json
{
	{
		"columns": [{name: string, type: string}, ...],
		"data": [
			[column0, column1, ...],
			... // Other rows
		]
	}
}
~~~
**`TreatedReaderContent`**

Used to request a file stored in _IndexedDB_ to be read.
~~~json
{
	"database": string, 
	"table": string, 
	"file_name": string, 
	"file_extension": string
}
~~~
**`RawAPIRequest`**

Holds the info to an API request.
~~~json
{
	"api_url": string,
	"method": string,
	"headers": string,
	"body": string
}
~~~
**`RawAPIContent`**

Holds the contents returned by an API.
~~~js
[{object}, ...]
~~~
**`ErrorDuringDataIngestion`**

Signifies an error that occurs during a process of data ingestion, such as reading from a file or API.
~~~json
{
	"error": string
}
~~~
**`ErrorDuringDataProcessing`**

Signifies an error that occurs during a process of data processing, such as in the _Input Type_ component.
~~~json
{
	"error": string,
	"line": number
}
~~~

# Components

<p align="center">
  <img src="images/Data.png"/>
</p>

## Component `file-reader`

The responsibility of this component is to collect a file (CSV or JSON) from the user, process it doing some fell steps of pre-processing data steps and stores it in the browser's Local Storage.

### Output Notices

notice    | source | message type
----------| -------| ------------
`loaded` | `As soon as the component finishes to store the content in Local Storage, it publishes the information about the database and stored data on the data bus.` | `TreatedReaderContent`
## Component `file-input`

The responsibility of this component is to collect data from Local Storage and transform it into a useful format for other components. Specifically, this component catch data from the Browser Local Storage, which is then inserted into the data bus.

### Input Notices

notice | action | message type
-------| ------ | ------------
`load` | `The component collects data from the received message with informations about the database and the table with data that needs to be get and initiates the process of catch data from the Local Storage into the JSON format.` | `RawFileContent` or `TreatedReaderContent` 

### Output Notices

notice    | source | message type
----------| -------| ------------
`output` | `As soon as the component finishes ingesting the JSON content, it publishes the result on the data bus.` | `TreatedDataContent` or `ErrorDuringDataIngestion`

---
## Component `api-input`

This component is used to ingest from an API specified by the user. It receives an API request comprised of URL, method, headers and body, and executes it.

It is important to note that the data this component publishes on the bus is the raw data it receives from the API if the request was successful, or an error message otherwise. The standardization of this data is a responsibility of the `api-parser` component.

### Input Notices

notice | action | message type
-------| ------ | ------------
`load` | `The component collects the request and starts the process of ingesting the API.` | `RawAPIRequest`

### Output Notices

notice    | source | message type
----------| -------| ------------
`output` | `When the request is finished, publishes the raw API content if the request was successful, or an error otherwise.` | `RawAPIContent` or `ErrorDuringDataIngestion`

---
## Component `api-parser`

This component is responsible for standardizing the raw data obtained from APIs through the `api-input` component. It receives the raw data and transforms it into the untyped standard format. From here, it should be typed by a `type-input` component before it is used by other modules. 

### Input Notices

notice | action | message type
-------| ------ | ------------
`input_raw` | `Collects the results of an API request and starts the process of transforming it into TreatedDataContent` | `RawAPIContent`

### Output Notices

notice    | source | message type
----------| -------| ------------
`output_processed` | `When the component finishes transforming the data received, publishes the treated data if the transformation was successful, or an error message otherwise.` | `TreatedDataContent` or `ErrorDuringDataIngestion`

---
## Component `file-typing`

This component receives JSON data from the data bus and, through user input, attempts to correctly define the types of the data provided, defaulting to String if no input is given. It separates by 'sep' input the information column and data. After this process is finished, it inserts the typed data into the data bus.

### Input Notices

notice | action | message type
-------| ------ | ------------
`type-input` | `Receives a JSON file and asks the user for input on the types of the data provided` | `TreatedFileContent`

### Output Notices

notice    | source | message type
----------| -------| ------------
`output` | `As the component finishes transforming the data based on user input, publishes the result on the data bus` | `TypedDataContent` or `ErrorDuringDataProcessing`

# Components Narratives

![Components Narratives](images/DataWorkflow.png)

## Setup
`file-reader` component
~~~html
<filereader-oid 
	sep="," 
	publish="loaded~file/loaded/[id]">
</filereader-oid>
~~~
`file-input` component
~~~html
<fileinput-oid
	subscribe="file/loaded/[id]~load_file"
	publish="output~show/message">
</fileinput-oid>
~~~
`api-input` component
~~~html
<api-input 
	subscribe="input_api/[id]~load"
    publish="output~receive_data/[id]">
</api-input>
~~~
`file-typing` component
~~~html
<file-typing
	subscribe="load_file/load/[id]~load_file"
	publish="output~[show/message]">
</file-typing>
~~~

## Narrative
- The `file-component` component recieves a file (csv or json), process the data and stores the data into the Browser Local Storage. 
-   The `file-input` component recieves the information about the database and consults the Local Storage to give the data in a Json Format.
-   When workflow sends a new file message on the data bus being watched, the component starts the process.
-   It identifies the file format, which can be either CSV or JSON, and calls the appropriate JS function to transform the data.
-   It loops through all the rows of the file, transforming each one into a JSON format.
-   The component appends these JSON objects to the output message body.
-   If any error occurs during the process, the component stops execution and publishes an error message on the data bus, which can be displayed by front.
-   If all rows have been processed successfully with no errors, the transformed data in JSON format is published on the data bus.
---
-   The `api-input` component listens to the data bus to wait for the spreadsheet URL inside `inputAPI` attribute to be processed in string format.
-   When workflow sends a new url message on the data bus being watched, the component starts the process.
-   Calls the function in javascript that will make the connection with the api to obtain the data, transforming into a JSON format.
-   The component appends these JSON objects to the output message body.
-   If any error occurs during the process, the component stops execution and publishes an error message on the data bus.
-   If all rows have been processed successfully with no errors, the transformed data in JSON format is published on the data bus.
---
-	The `file-typing` component watches the data bus for incoming JSON files that must be typed.
-	It initiates the process on the result of the process of a `file-input` or `api-input` component.
-	It sends a message triggers the opening of an interface that asks the user to indicate the types of each column of the data in question.
-	Based on the user's response, it types the data received.
-   If any error occurs during the process, the component stops execution and publishes an error message on the data bus.
-   If all rows have been processed successfully with no errors, the typed data in JSON format is published on the data bus.

## Examples

### File Input and File Reader
![File Input](images/diagram_file_input.png)
An example usage of file-input and file-reader with a component of group model can be found in the folder `data/examples-integration/data-model`.

An example usage of file-input and file-reader can be found in the folder `data/examples/exampleGetDBTable.html`.
