# Module `Data`

# Description
> Our module's responsibility is to gather raw data from files and APIs and transform it into useful data for the other components to use. Essentially, we take raw data and convert it into a JSON format, which is then inserted into the data bus.

# Team
* `Giovana Kerche Bonás`
  * `<brief description of the activities developed by this member>`
* `Gustavo Araújo Morais`
  * `<brief description of the activities developed by this member>`
* `João Guilherme Alves Santos`
  * `<brief description of the activities developed by this member>`
* `Raniery Rodrigues da SIlva`
  * `<brief description of the activities developed by this member>`
* `Leonardo Livrare Martins`
  * `Responsible for architecting and developing the file input component to transform into JSON.`

# Message Types

**`RawFileContent`**
~~~json
{
  "file_id": string,
  "file_format": string,
  "file_content": string,
  "columns_types": [
	  {"column_0": string},
	  ...
	  {"column_n": string}
  ]
}
~~~
**`TreatedDataContent`**
~~~json
{
	"file_id": string,
	"content": [
		{
			"column_0": string //"elem[0][0]",
			"column_1": string //"elem[0][1]",
			...
			"column_n": string //"elem[0][n]"
		},
		{
			"column_0": string //"elem[1][0]",
			"column_1": string //"elem[1][1]",
			...
			"column_n": string //"elem[1][n]"
		},
		...
		{
			"column_0": string //"elem[k][0]",
			"column_1": string //"elem[k][1]",
			...
			"column_n": string //"elem[k][n]"
		}
	],
	"columns_types": [
		{
			"column_0": string,
			"column_1": string,
			...
			"column_n": string
		}
	]
}
~~~
**`ErrorDuringDataProcessing`**
~~~json
{
	"file_id": string,
	"error": string,
	"line": number
}
~~~
**`RawAPIContent`**
~~~json
{
	"file_id": string,
	"api_type": string,
	"url_content": string
}
~~~



# Components


## Component `file-input`

> The responsibility of this component is to collect raw data from csv and xlsx files and transform it into a useful format for other components. Specifically, we convert the raw data into a JSON format, which is then inserted into the data bus.

### Input Notices

notice | action | message type
-------| ------ | ------------
`inputFile` | `The component collects data from the received message and initiates the process of transforming the raw data from the file into the JSON format.` | `RawFileContent`

### Output Notices

notice    | source | message type
----------| -------| ------------
`inputFile` | `As soon as the component finishes transforming the raw data into JSON, it publishes the result on the data bus.` | `TreatedDataContent` or `ErrorDuringDataProcessing`

# Components Narratives
## Narrative
-   The `file-input` component watches the data bus for incoming file input that needs to be processed and transformed into JSON format.
-   When a new file message arrives on the data bus being watched, the component starts the process.
-   It identifies the file format, which can be either CSV or XLSX, and calls the appropriate JS function to transform the data.
-   It loops through all the rows of the file, transforming each one into a JSON format.
-   The component appends these JSON objects to the output message body.
-   If any error occurs during the process, the component stops execution and publishes an error message on the data bus.
-   If all rows have been processed successfully with no errors, the transformed data in JSON format is published on the data bus.
---
## Component `api-input`

>For this component, the responsibility is to collect raw data from an API specified by us. Initially we are thinking about the implementation for the google sheet API that will take data from online spreadsheets and transform it into a useful format for other components. Similar to file-input, we convert the raw data into a JSON format, which is then inserted into the data bus.

### Input Notices

notice | action | message type
-------| ------ | ------------
`inputApi` | `The component collects the url received and starts the process of obtaining and transforming the raw data into JSON format.` | `RawAPIContent`

### Output Notices

notice    | source | message type
----------| -------| ------------
`inputApi` | `As soon as the component finishes transforming the raw data into JSON, it publishes the result on the data bus.` | `TreatedDataContent` or `ErrorDuringDataProcessing`

# Components Narratives
## Narrative
-   The `api-input` component listens to the data bus to wait for the spreadsheet URL to be processed in string format.
-   When a new url message arrives on the data bus being watched, the component starts the process.
-   Calls the function in javascript that will make the connection with the api to obtain the data, transforming into a JSON format.
-   The component appends these JSON objects to the output message body.
-   If any error occurs during the process, the component stops execution and publishes an error message on the data bus.
-   If all rows have been processed successfully with no errors, the transformed data in JSON format is published on the data bus.


