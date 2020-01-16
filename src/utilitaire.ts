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

  public createTableRow(str: string): string[]{
    let sortie: string[] = str.replace("[[", "").replace("]]", "").split("], [");
    let table: string[] = [];
    let table_ = [];
    let json = {};
    sortie.forEach(function (value) {
      table.push(value.split(", "));
    })
    let headers: string[] = table[0];
    table.splice(0, 1);
    table.forEach(function(row){
      json = {};
      headers.forEach((header, i)=>{
        json[header] = (row[i] == 'null') ? '' : row[i];
      })
      table_.push(json); 
    })
    json = {};
    json['headers'] = headers;
    table_.push(json);
    return table_;
  }

  public createTableColumns(str: string, turn:number): JSON[]{
    let sortie: string[] = str.replace("[[", "").replace("]]", "").split("], [");
    let table: string[][] = [];
    let table_: JSON[] = [];
    let json = {};
    let headers: string[]= [];
    let col: string[]= [];
    let index_turn: number = -1;
    sortie.forEach(function (value) {
      table.push(value.split(", "));
    })
    while(index_turn<=turn){
      if(index_turn==-1){
        headers.push(' ');
      }
      else{
        headers.push('Saison n°'+index_turn); 
      }
      index_turn += 1;
    }
    for (var c = 0; c < table[0].length; c++){
      for (var r = 0; r < table.length; r++){
        json[c+''+r] = table[r][c];
      }
      table_.push(json);json = {};
    };
    //console.log(table);
    json = {}; json['headers'] = headers; table_.push(JSON.parse(JSON.stringify(json)));
    //console.log('table_ '+Object.keys(table_));
    //console.log('table_ '+JSON.stringify(table_));
    return table_;
  }

}