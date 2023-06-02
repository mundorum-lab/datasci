export class WorldSpace{
    /*
    Stores the WorldSpace information
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