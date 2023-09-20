import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })
  export class BdserviceService {
    //variable para la conexion de BD
    public database!: SQLiteObject;
  
    //variables de creación de tablas
    tablaNoticia: string = "CREATE TABLE IF NOT EXISTS juego(id INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(100) NOT NULL, texto VARCHAR(300) NOT NULL);";
  
    //variables para los insert iniciales
    registroNoticia: string = "INSERT or IGNORE INTO juego(id,titulo,texto) VALUES (1,'Soy un titulo','Soy un texto largo de esta noticia');";
  
    //observables para las tablas que se consultaran
    listaNoticias = new BehaviorSubject([]);
  
    //observable para manipular el status de la BD
    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  
    constructor(private alertController: AlertController, public sqlite: SQLite, private platform: Platform) {
      this.crearBD();
    }
  
    dbState(){
      return this.isDBReady.asObservable();
    }
  
    fetchNoticia(): Observable<Noticia[]>{
      return this.listaNoticias.asObservable();
    }
  
  
    buscarNoticias(){
      //retorno el resultado de la consulta
      return this.database.executeSql('SELECT * FROM noticia',[]).then(res =>{
        //la consulta se realizó correctamente
        //creamos una variable para almacenar los registros del select
        let items: Noticia[] = [];
        //validar cuantos registros vienen en el select
        if(res.rows.length > 0){
          //recorro la consulta dentro del res
          for(var i = 0; i < res.rows.length; i++){
            //alamaceno los registros en items
            items.push({
              id : res.rows.item(i).id,
              titulo: res.rows.item(i).titulo,
              texto: res.rows.item(i).texto
            })
          }
        }
        this.listaNoticias.next(items as any);
  
      })
    }
  
    eliminar(id:any){
      return this.database.executeSql('DELETE FROM noticia WHERE id = ?', [id]).then(res=>{
        this.buscarNoticias();
      })
  
    }
  
    agregar(titulo:any,texto:any){
  
      return this.database.executeSql('INSERT INTO noticia (titulo,texto) VALUES (?,?)',[titulo,texto]).then(res=>{
        this.buscarNoticias();
      })
    }
  
    modificar(id:any,titulo:any,texto:any){
  
      return this.database.executeSql('UPDATE noticia SET titulo=?, texto=? WHERE id=?',[titulo,texto,id]).then(res=>{
        this.buscarNoticias();
      })
    }
  
  
  
    crearBD() {
      //verifico si la plataforma está lista
      this.platform.ready().then(() => {
        //crear la BD
        this.sqlite.create({
          name: 'bdnoticias.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          //guardo la conexión a BD en mi variable
          this.database = db;
          //llamo a la creación de las tablas
          this.crearTablas();
        }).catch(e => {
          this.presentAlert("Error en crear BD: " + e);
        })
      })
    }
  
  
    async crearTablas() {
      try {
        //creamos las tablas
        await this.database.executeSql(this.tablaNoticia,[]);
  
        //creamos los registros iniciales
        await this.database.executeSql(this.registroNoticia,[]);
  
        
        //actualizamos el observable de la BD
        this.isDBReady.next(true);
  
        //llamamos al buscar noticias
        this.buscarNoticias();
  
      } catch (e) {
        this.presentAlert("Error en crear Tabla: " + e);
      }
    }
  
  
    async presentAlert(msj: string) {
      const alert = await this.alertController.create({
        header: 'Error en Servicio',
        message: msj,
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  
  
  
  
  }