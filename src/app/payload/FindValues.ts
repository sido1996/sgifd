
export class FindValues {

  getObjectInList(id: number, objects: Array<any>): any {
    let rep: boolean = false;
    let i = 0;
    let result: any = null;
    while (i < objects.length && rep === false) {
      if (objects[i].id === id) {
        rep = true;
        result = objects[i];
      }
      i++;
    }
    return result;
  }

  getObjectListInList(ids: Array<number>, objects: Array<any>): Array<any> {
    let rep: boolean = false;
    let i = 0;
    let result: Array<any> = [];
    for(let j=0 ; j< ids.length; j++) {
      rep = false;
      while (i < objects.length && rep === false) {
        if (objects[i].id === ids[j]) {
          rep = true;
          result.push(objects[i]);
        }
        i++;
      }
    }
    return result;
  }

  getArrayId(objetcs: Array<any>): Array<number> {
    let id: Array<number> = [];
    for(let i=0; i< objetcs.length; i++){
      id.push(objetcs[i].id);
    }
    return id;
  }

}
