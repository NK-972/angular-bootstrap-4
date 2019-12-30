export class Utilitaire {

    public StringToTable(str:String): JSON{
    let sortie: Array<string>;
    var JSONQury = {};
    sortie = str.replace("[[", "").replace("]]", "").split("], [");
    sortie.forEach(function (value) {
      //console.log(value.split(", "));
      JSONQury[value.split(", ")[0]] = value.split(", ");
    })
    //console.log(this.json_produits);
    return JSONQury as JSON;
  }

  public getData(json: JSON, key:String, turn:string, columns:string): string{
    let sortie: Array<string> = Object.keys(json) as Array<string>;
    let index: Number = json['JSON'].indexOf(columns);
    let bool: Boolean = (key+turn) in json;
    console.log("getData "+key+" "+turn+" "+columns+" "+bool);
    if(key+turn in json){
          return json[key+turn][index];
      }
    return null;
  }

  public getAllOcc(array : string[], find: string): string[]{
    let l: string[] = [];
    array.forEach(function (value) {
      if (value.includes(find)){
        l.push(value);
      }
    });
    return l;
  }

}