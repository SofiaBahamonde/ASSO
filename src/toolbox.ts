import { Tool } from "tool";
import { InterfaceObj } from "./interfaceobj"

export class ToolBox implements InterfaceObj{

    private tools:Array<Tool>

    constructor() { this.tools= new Array<Tool>()}

    add(new_tool:Tool){
        this.tools.push(new_tool)
   }

   getTools(): Array<Tool>{

        return this.tools

   }
}