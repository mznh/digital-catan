import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ViewCommandService } from '../service/view-command/view-command.service'

// for test
import { CommandData, COMMAND_TYPE} from '../model/command' 

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
  @ViewChild('commandLogBox') commandLogBox: ElementRef ;
  public commandLog : CommandData[];

  constructor( 
    private viewCommandService: ViewCommandService,
  ) {
    console.log(this.viewCommandService.getCommandStream());
    this.commandLog = [];
  }

  ngOnInit(): void {
    this.viewCommandService.getCommandStream().subscribe(
      //command execute 
      (command: CommandData) =>{
        this.commandLog.push(command)
      },
      (error:any) =>{
        const errorCommand = {
          type: COMMAND_TYPE.UNKNOWN_ERROR,
          target: "",
          value: 0,
          message: error
        }
        this.commandLog.push(errorCommand)
      }
    );
  }
  ngAfterViewChecked(){
    const scrollPosition = this.commandLogBox.nativeElement.scrollHeight;
    this.commandLogBox.nativeElement.scrollTop = scrollPosition;
  }

  //for stream test

  public putTreasure(animationType:string){
    console.log("push")
    const tmpCommandData ={
      type: COMMAND_TYPE.TEST_TREASURE,
      target: animationType,
      value: 0,
      message: "this is test message"
    };
    this.viewCommandService.sendCommandData(tmpCommandData);
  }

  public putRoadKoma(position:number){
    const tmpCommandData ={
      type: COMMAND_TYPE.PUT_ROAD,
      target: "test",
      value: position,
      message: "this is test message"
    };
    this.viewCommandService.sendCommandData(tmpCommandData);
  }

  public putSettlementKoma(position:number){
    const tmpCommandData ={
      type: COMMAND_TYPE.PUT_SETTLEMENT,
      target: "test",
      value: position,
      message: "this is test message"
    };
    this.viewCommandService.sendCommandData(tmpCommandData);
  }

  public flashCanvas(){
    const tmpCommandData ={
      type: COMMAND_TYPE.REMOVE_ROAD,
      target: "remove",
      value: 100,
      message: "this is remove test message"
    };
    this.viewCommandService.sendCommandData(tmpCommandData);
  }

}
