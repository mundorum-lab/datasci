export class WorldSpace{
    /**
     * Stores the WorldSpace information
     * 
     * Properties
     * createdWSSubcomponentsAmmount : The number of WorldSpaceSubcomponents created
     * onWorldSpaceComponents : List of components in the world space
     * 
     * @property {number} createdWSSubcomponentsAmmount
     * @property {object} onWorldSpaceComponents
     */

   /*
    allTimeCreatedBehaviours : static int
    onSceneComponents : static List<WorldSpaceComponents>
   */
  static createdWSSubcomponentsAmmount = 0;
  static onWorldSpaceComponents = {}


  static FreeWorldSpace(){
    /*
    Cleans the workspace
    */

    //TODO
    onWorldSpaceComponents.forEach(component => {
      if (typeof component.OnDestroy === 'function') {
        component.OnDestroy();
      }
    });
    this.onWorldSpaceComponents = {}
    

  }


}