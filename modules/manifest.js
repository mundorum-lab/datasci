import nodeExample from './workflow/nodeExample.json'

function getAvailableNodes(){
    return (
        {
            exampleCategory: [
                ...nodeExample
            ],
            exampleCategory2: [
                ...nodeExample
            ]
        }
    );
    
}

export { getAvailableNodes };