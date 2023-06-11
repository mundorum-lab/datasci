import nodeExample from './workflow/nodeExample.json'

function getAvailableNodes(){
    return (
        {
            exampleCategory: [
                nodeExample
            ]
        }
    );
    
}

export { getAvailableNodes };