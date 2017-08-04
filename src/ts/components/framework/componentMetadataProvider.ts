import {Autowired, Bean, PostConstruct} from "../../context/context";
import {IComponent} from "../../interfaces/iComponent";
import {AgGridComponentFunctionInput} from "./componentProvider";
import {AgComponentUtils} from "./agComponentUtils";

export interface ComponentMetadata {
    mandatoryMethodList:string[],
    optionalMethodList:string[],
    functionAdapter?:(callback:AgGridComponentFunctionInput)=>{new(): IComponent<any>}
}


@Bean("componentMetadataProvider")
export class ComponentMetadataProvider {
    private componentMetaData :{[key:string]:ComponentMetadata};

    @Autowired("agComponentUtils")
    private agComponentUtils: AgComponentUtils;

    @PostConstruct
    public postConstruct (){
        this.componentMetaData = {
            dateComponent: {
                mandatoryMethodList: ['getDate', 'setDate'],
                optionalMethodList: []
            },
            headerComponent: {
                mandatoryMethodList: [],
                optionalMethodList: []
            },
            headerGroupComponent: {
                mandatoryMethodList: [],
                optionalMethodList: []
            },
            floatingFilterComponent: {
                mandatoryMethodList: ['onParentModelChanged'],
                optionalMethodList: ['afterGuiAttached']
            },
            floatingFilterWrapperComponent: {
                mandatoryMethodList: [],
                optionalMethodList: []
            },
            filterComponent:{
                mandatoryMethodList: ['isFilterActive','doesFilterPass','getModel','setModel'],
                optionalMethodList: ['afterGuiAttached','onNewRowsLoaded','getModelAsString','onFloatingFilterChanged']
            },
            cellRenderer:{
                mandatoryMethodList: ['refresh'],
                optionalMethodList: [],
                functionAdapter: this.agComponentUtils.adaptCellRendererFunction.bind(this.agComponentUtils)
            },
            innerRenderer:{
                mandatoryMethodList: [],
                optionalMethodList: [],
                functionAdapter: this.agComponentUtils.adaptCellRendererFunction.bind(this.agComponentUtils)
            },
            fullWidthCellRenderer:{
                mandatoryMethodList: [],
                optionalMethodList: [],
                functionAdapter: this.agComponentUtils.adaptCellRendererFunction.bind(this.agComponentUtils)
            }
        }
    }

    retrieve (name:string):ComponentMetadata{
        return this.componentMetaData[name];
    }
}