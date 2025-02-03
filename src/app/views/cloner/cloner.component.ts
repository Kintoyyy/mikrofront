import { Component, OnInit, OnDestroy, ViewChildren ,QueryList } from "@angular/core";
import { dataProvider } from "../../providers/mikrowizard/data";
import { Router } from "@angular/router";
import { loginChecker } from "../../providers/login_checker";
import {
  GuiSelectedRow,
  GuiSearching,
  GuiInfoPanel,
  GuiColumn,
  GuiColumnMenu,
  GuiPaging,
  GuiPagingDisplay,
  GuiRowSelectionMode,
  GuiRowSelection,
  GuiRowSelectionType,
} from "@generic-ui/ngx-grid";
import { NgxSuperSelectOptions } from "ngx-super-select";
import { _getFocusedElementPierceShadowDom } from "@angular/cdk/platform";


import { ToasterComponent } from "@coreui/angular";
import { AppToastComponent } from "../toast-simple/toast.component";

@Component({
  templateUrl: "cloner.component.html",
  styleUrls: ["cloner.scss"],

})
export class ClonerComponent implements OnInit {
  public uid: number;
  public uname: string;
  public ispro: boolean = false;

  constructor(
    private data_provider: dataProvider,
    private router: Router,
    private login_checker: loginChecker
  ) {
    var _self = this;
    if (!this.login_checker.isLoggedIn()) {
      setTimeout(function () {
        _self.router.navigate(["login"]);
      }, 100);
    }
    this.data_provider.getSessionInfo().then((res) => {
      _self.uid = res.uid;
      _self.uname = res.name;
      _self.ispro = res['ISPRO']
      const userId = _self.uid;

      if (res.role != "admin") {
        setTimeout(function () {
          _self.router.navigate(["/user/dashboard"]);
        }, 100);
      }
    });
    //get datagrid data
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== "";
    }
  }
  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  
  public source: Array<any> = [];
  public columns: Array<GuiColumn> = [];
  public loading: boolean = true;
  public rows: any = [];
  public SelectedCloner: any = {};
  public SelectedClonerItems: any = "";
  public EditClonerModalVisible: boolean = false;
  public DeleteConfirmModalVisible: boolean = false;
  public Members: any = "";
  public SelectedMembers: any = [];
  public NewMemberModalVisible: boolean = false;
  public availbleMembers: any = [];
  public NewMemberRows: any = [];
  public SelectedNewMemberRows: any;
  public master: number = 0;
  public active_commands:any=[];
  public tabs:any=[
      {
        "name": "Network",
        "sections": [
          {
            "title": "IP Management",
            "commands": [
              "/ip address",
              "/ip cloud",
              "/ip dhcp-server",
              "/ip dns",
              "/ip pool",
              "/ip route",
              "/ip vrf"
            ]
          },
          {
            "title": "IP Services",
            "commands": [
              "/ip service"
            ]
          }
        ]
      },
      {
        "name": "Security",
        "sections": [
          {
            "title": "Firewall",
            "commands": [
              "/ip firewall address-list",
              "/ip firewall connection",
              "/ip firewall layer7-protocol",
              "/ip firewall nat",
              "/ip firewall service-port",
              "/ip firewall calea",
              "/ip firewall filter",
              "/ip firewall mangle",
              "/ip firewall raw"
            ]
          },
          {
            "title": "IPSec",
            "commands": [
              "/ip ipsec identity",
              "/ip ipsec key",
              "/ip ipsec peer",
              "/ip ipsec profile",
              "/ip ipsec settings",
              "/ip ipsec statistics",
              "/ip ipsec proposal",
              "/ip ipsec policy",
              "/ip ipsec mode-config",
              "/ip ipsec active-peers",
              "/ip ipsec installed-sa"
            ]
          }
        ]
      },
      {
        "name": "System",
        "sections": [
          {
            "title": "Scripts & Scheduling",
            "commands": [
              "/system script",
              "/system scheduler"
            ]
          },
          {
            "title": "Time Management",
            "commands": [
              "/system ntp client servers",
              "/system ntp client",
              "/system ntp server",
              "/system clock"
            ]
          },
          {
            "title": "RADIUS",
            "commands": [
              "/radius"
            ]
          }
        ]
      },
      {
        "name": "MPLS",
        "sections": [
          {
            "title": "MPLS Configuration",
            "commands": [
              "/mpls forwarding-table",
              "/mpls interface",
              "/mpls ldp",
              "/mpls settings",
              "/mpls traffic-eng"
            ]
          },
          {
            "title": "VPLS",
            "commands": [
              "/interface vpls"
            ]
          }
        ]
      }
    ];
  
  public sorting = {
    enabled: true,
    multiSorting: true,
  };
  searching: GuiSearching = {
    enabled: true,
    placeholder: "Search Devices",
  };

  options: Partial<NgxSuperSelectOptions> = {
    selectionMode: "single",
    actionsEnabled: false,
    displayExpr: "name",
    valueExpr: "id",
    placeholder: "Snippet",
    searchEnabled: true,
    enableDarkMode: false,
  };

  public paging: GuiPaging = {
    enabled: true,
    page: 1,
    pageSize: 10,
    pageSizes: [5, 10, 25, 50],
    display: GuiPagingDisplay.ADVANCED,
  };

  public columnMenu: GuiColumnMenu = {
    enabled: true,
    sort: true,
    columnsManager: true,
  };

  toasterForm = {
    autohide: true,
    delay: 3000,
    position: "fixed",
    fade: true,
    closeButton: true,
  };

  public infoPanel: GuiInfoPanel = {
    enabled: true,
    infoDialog: false,
    columnsManager: true,
    schemaManager: true,
  };

  public rowSelection: boolean | GuiRowSelection = {
    enabled: true,
    type: GuiRowSelectionType.CHECKBOX,
    mode: GuiRowSelectionMode.MULTIPLE,
  };
  activate_command(command:string){
    // add to active_commands if it not added before
    if(!this.active_commands.includes(command)){
      this.active_commands.push(command);
    }
    else{
      this.active_commands=this.active_commands.filter((x:any)=>x!=command);
    }
  }
  show_toast(title: string, body: string, color: string) {
    const { ...props } = { ...this.toasterForm, color, title, body };
    const componentRef = this.viewChildren.first.addToast(
      AppToastComponent,
      props,
      {}
    );
    componentRef.instance["closeButton"] = props.closeButton;
  }
  show_new_member_form() {
    this.NewMemberModalVisible = true;
    var _self = this;
    _self.availbleMembers = [];
    this.SelectedNewMemberRows = [];
    this.NewMemberRows = [];

    var data = {
      group_id: false,
      search: false,
      page: false,
      size: 10000,
    };

    if (this.SelectedCloner["pair_type"] == "devices")
      _self.data_provider.get_dev_list(data).then((res) => {
        _self.availbleMembers = res.filter(
          (x: any) => !_self.SelectedClonerItems.includes(x.id)
        );
        _self.NewMemberModalVisible = true;
      });
    else
      _self.data_provider.get_devgroup_list().then((res) => {
        _self.availbleMembers = res.filter(
          (x: any) => !_self.SelectedClonerItems.includes(x.id)
        );
        _self.NewMemberModalVisible = true;
      });
  }

  ngOnInit(): void {
    this.initGridTable();
  }

  submit(action: string) {
    var _self = this;
    if(_self.master==0 && _self.SelectedCloner['direction']=='oneway'){
      _self.show_toast(
        "Error",
        "Master device is not selected",
        "danger"
      );
      return;
    }
    if(_self.SelectedCloner['direction']=='twoway' && _self.SelectedCloner['pair_type']=='groups'){
      _self.show_toast(
        "Error",
        "Using Groups is only allowed with Master Mode",
        "danger"
      );
      return;  
    }
    if (_self.master!=0 && _self.SelectedCloner['direction']=='oneway'){
      _self.SelectedCloner["masterid"]=_self.master;
    }
    _self.SelectedCloner["active_commands"]=_self.active_commands;
    if (action == "add") {
      this.data_provider
        .Add_cloner(_self.SelectedCloner, _self.SelectedClonerItems)
        .then((res) => {
          _self.initGridTable();
        });
    } else {
      this.data_provider
        .Edit_cloner(_self.SelectedCloner, _self.SelectedClonerItems)
        .then((res) => {
          _self.initGridTable();
        });
    }
    this.EditClonerModalVisible = false;
  }

  onSelectedRowsNewMembers(rows: Array<GuiSelectedRow>): void {
    this.NewMemberRows = rows;
    this.SelectedNewMemberRows = rows.map((m: GuiSelectedRow) => m.source);
  }

  add_new_members() {
    var _self = this;
    _self.SelectedMembers = [
      ...new Set(_self.SelectedMembers.concat(_self.SelectedNewMemberRows)),
    ];

    _self.SelectedClonerItems = _self.SelectedMembers.map((x: any) => {
      return x.id;
    });

    this.NewMemberModalVisible = false;
  }

  set_master(id:number){
    var _self=this;
    this.master=id;
    // sort SelectedMembers and put master on top
    this.SelectedMembers=
    [
      ...new Set(
        this.SelectedMembers.sort((a:any,b:any)=>{
          if(a.id==_self.master) return -1;
          if(b.id==_self.master) return 1;
          return 0;
        })

      ),
    ];
  }


  editAddCloner(item: any, action: string) {
    if (action == "showadd") {
      this.SelectedCloner = {
        id: 0,
        name: "",
        description: "",
        pair_type: "devices",
        live_mode: false,
        schedule: false,
        cron: "",
        desc_cron: "",
        direction: "oneway",
        members: "",
        action: "add",
      };
      this.SelectedMembers = [];
      this.SelectedClonerItems = [];
      this.EditClonerModalVisible = true;
      return;
    }

    var _self = this;
    this.SelectedCloner = { ...item };
    this.active_commands=item['active_commands']?JSON.parse(item['active_commands']):[];
    if (action != "select_change" ) {
      this.SelectedCloner["action"] = "edit";
      this.data_provider.get_cloner_members(_self.SelectedCloner.id).then((res) => {
        _self.SelectedMembers = res;
        if(_self.SelectedCloner["master"] && _self.SelectedCloner['direction']=='oneway'){
          _self.set_master(_self.SelectedCloner["master"]);
        }
        _self.EditClonerModalVisible = true;
        _self.SelectedClonerItems = res.map((x: any) => {
          return x.id;
        });
      });
    } else {
      _self.SelectedMembers = [];
      this.SelectedClonerItems = [];
    }
  }


  in_active_commands(command:string){
    return this.active_commands.includes(command);
  }
  remove_member(item: any) {
    var _self = this;
    _self.SelectedMembers = _self.SelectedMembers.filter(
      (x: any) => x.id != item.id
    );
    _self.SelectedClonerItems = _self.SelectedMembers.map((x: any) => {
      return x.id;
    });
  }

  get_member_by_id(id: string) {
    return this.Members.find((x: any) => x.id == id);
  }

  confirm_delete(item: any = "", del: boolean = false) {
    if (!del) {
      this.SelectedCloner = { ...item };
      this.DeleteConfirmModalVisible = true;
    } else {
      var _self = this;
      this.data_provider.Delete_cloner(_self.SelectedCloner["id"]).then((res) => {
        _self.initGridTable();
        _self.DeleteConfirmModalVisible = false;
      });
    }
  }

  form_changed() {
    this.editAddCloner(this.SelectedCloner, "select_change");
  }

  logger(item: any) {
    console.dir(item);
  }

  initGridTable(): void {
    var _self = this;
    this.data_provider.get_cloner_list().then((res) => {
      _self.source = res.map((x: any) => {
        return x;
      });
      _self.loading = false;
    });
  }
}
