"use strict";(self.webpackChunksecuriskadmin=self.webpackChunksecuriskadmin||[]).push([[317],{5317:(W,h,u)=>{u.r(h),u.d(h,{LeadershipTeamModule:()=>H});var b=u(2387),T=u(2581),C=u(9629),_=u(8239),e=u(9619),s=u(9010),f=u(9365),k=u(8438),v=u(6019);function y(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Name is required"),e.qZA())}function P(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,y,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("name"))||null==n.errors?null:n.errors.required)}}function w(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Designation is required"),e.qZA())}function M(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,w,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("designation"))||null==n.errors?null:n.errors.required)}}function L(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Description is required"),e.qZA())}function F(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,L,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("description"))||null==n.errors?null:n.errors.required)}}function O(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Image is required"),e.qZA())}function I(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,O,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("profile_img"))||null==n.errors?null:n.errors.required)}}function A(i,r){if(1&i){const t=e.EpF();e.TgZ(0,"div",30),e.TgZ(1,"div",31),e._uU(2),e.qZA(),e.TgZ(3,"div",32),e.TgZ(4,"i",33),e.NdJ("click",function(){return e.CHM(t),e.oxw().previewImg()}),e.qZA(),e.TgZ(5,"i",34),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.MAs(31).value="",o.removeImg()}),e.qZA(),e.qZA(),e.qZA()}if(2&i){const t=e.oxw();e.xp6(2),e.Oqu(t.selectedProfileImg.name)}}function q(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Facebook Link is required"),e.qZA())}function N(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,q,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("fb_link"))||null==n.errors?null:n.errors.required)}}function U(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Instagram Link is required"),e.qZA())}function J(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,U,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("insta_link"))||null==n.errors?null:n.errors.required)}}function Y(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Twitter Link is required"),e.qZA())}function D(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,Y,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("twitter_link"))||null==n.errors?null:n.errors.required)}}function Q(i,r){1&i&&(e.TgZ(0,"span"),e._uU(1,"Youtube Link is required"),e.qZA())}function E(i,r){if(1&i&&(e.TgZ(0,"div",28),e.YNc(1,Q,2,0,"span",29),e.qZA()),2&i){const t=e.oxw();let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.memberForm.get("youtube_link"))||null==n.errors?null:n.errors.required)}}const Z=".actions[_ngcontent-%COMP%]{display:flex;grid-gap:10px;gap:10px;justify-content:center}.actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#8a3265;cursor:pointer}";let S=(()=>{class i{constructor(t,n,o,a,m){var c=this;this.fb=t,this.afs=n,this.storage=o,this.spinner=a,this.toastr=m,this.settings={columns:{s_no:{title:"S No.",filter:!1},name:{title:"Name",filter:!1},designation:{title:"Designation",filter:!1},profile_img:{title:"Profile Image",filter:!1,type:"custom",renderComponent:z},actions:{title:"Actions",filter:!1,type:"custom",renderComponent:j,onComponentInitFunction:d=>{d.onEdit.subscribe(l=>{console.log("Edit",l),this.addEditLabel="Edit",this.editId=l.id,console.log(),this.memberForm.patchValue({name:l.name,designation:l.designation,fb_link:l.facebookLink,insta_link:l.instagramLink,youtube_link:l.youtubeLink,twitter_link:l.twitterLink}),this.selectedProfileImg=l.image,this.selectedProfileImg&&this.selectedProfileImg.name&&this.memberForm.controls.profile_img.disable()}),d.onDelete.subscribe(function(){var l=(0,_.Z)(function*(p){return yield c.delete(p.id)});return function(p){return l.apply(this,arguments)}}())}}},pager:{display:!0,perPage:10},actions:{add:!1,edit:!1,delete:!1,position:"right"}},this.source=new f.nC([]),this.addEditLabel="Add New",this.editId="",this.selectedProfileImg={},this.memberForm=this.fb.group({name:new s.NI("",[s.kI.required]),designation:new s.NI("",[s.kI.required]),description:new s.NI("",[s.kI.required]),profile_img:new s.NI("",[s.kI.required]),fb_link:new s.NI(""),insta_link:new s.NI(""),twitter_link:new s.NI(""),youtube_link:new s.NI("")})}ngOnInit(){var t=this;return(0,_.Z)(function*(){yield t.getLeadershipTeam()})()}getLeadershipTeam(){var t=this;return(0,_.Z)(function*(){t.spinner.show();let n=yield t.afs.collection("leadershipTeam").get().toPromise();t.spinner.hide();let o=[];for(let a in n.docs){let{name:m,designation:c,description:d,image:l,facebookLink:p,twitterLink:g,instagramLink:X,youtubeLink:G}=n.docs[a].data();l=l&&"{"==l.charAt(0)?JSON.parse(l):{},o.push({s_no:+a+1,id:n.docs[a].id,name:m,designation:c,description:d,image:l,profile_img:l.file,fb_link:p,insta_link:X,twitter_link:g,youtube_link:G})}t.source=new f.nC(o)})()}delete(t){var n=this;this.spinner.show(),this.afs.collection("leadershipTeam").doc(t).delete().then(function(){var o=(0,_.Z)(function*(a){yield n.getLeadershipTeam(),n.spinner.hide(),n.toastr.success("Leadership member deleted successfully","Successful")});return function(a){return o.apply(this,arguments)}}()).catch(o=>{this.spinner.hide(),this.toastr.error(o.message,"Error")})}onSearch(t=""){this.source.setFilter([{field:"name",search:t},{field:"designation",search:t},{field:"description",search:t}],!1)}uploadImg(t){var n=this;let o=t.target.files[0],a=o.name.split(".")[1];console.log(o);let m=new FormData;m.append(o.name,o);let c=this.storage.ref(`leadershipTeam/${this.memberForm.controls.name.value?this.memberForm.controls.name.value+"."+a:o.name}`);this.spinner.show(),c.put(o).then(function(){var d=(0,_.Z)(function*(l){const p=yield c.getDownloadURL().toPromise();n.selectedProfileImg={name:o.name,file:m,fileUrl:p},n.memberForm.controls.profile_img.disable(),n.spinner.hide(),n.toastr.success("Image uploaded successfully","Successful")});return function(l){return d.apply(this,arguments)}}()).catch(d=>{this.spinner.hide(),this.toastr.error(d.message,"Error"),this.memberForm.controls.profile_img.reset()})}removeImg(){this.selectedProfileImg={},this.memberForm.controls.profile_img.disable()}previewImg(){let t=document.createElement("a");t.href=this.selectedProfileImg.fileUrl,t.target="_blank",document.body.appendChild(t),t.click(),document.body.removeChild(t)}onSubmit(){var t=this;for(let n in this.memberForm.controls)this.memberForm.controls[n].markAsTouched(),this.memberForm.controls[n].updateValueAndValidity();if(this.memberForm.valid){let n={name:this.memberForm.controls.name.value,designation:this.memberForm.controls.designation.value,description:this.memberForm.controls.description.value,image:JSON.stringify(this.selectedProfileImg),facebookLink:this.memberForm.controls.fb_link.value||"",instagramLink:this.memberForm.controls.insta_link.value||"",twitterLink:this.memberForm.controls.twitter_link.value||"",youtubeLink:this.memberForm.controls.youtube_link.value||""};this.editId?(this.spinner.show(),this.afs.collection("leadershipTeam").doc(this.editId).update(n).then(function(){var o=(0,_.Z)(function*(a){t.memberForm.reset(),t.editId="",t.addEditLabel="Add New",t.selectedProfileImg={},t.memberForm.controls.profile_img.enable(),yield t.getLeadershipTeam(),t.spinner.hide(),t.toastr.success("Leadership member updated successfully","Successful")});return function(a){return o.apply(this,arguments)}}()).catch(o=>{this.spinner.hide(),this.toastr.error(o.message,"Error")})):(this.spinner.show(),this.afs.collection("leadershipTeam").add(n).then(function(){var o=(0,_.Z)(function*(a){t.memberForm.reset(),t.selectedProfileImg={},t.memberForm.controls.profile_img.enable(),yield t.getLeadershipTeam(),t.spinner.hide(),t.toastr.success("Leadership member added successfully","Successful")});return function(a){return o.apply(this,arguments)}}()).catch(o=>{this.spinner.hide(),this.toastr.error(o.message,"Error")}))}}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(s.qu),e.Y36(T.ST),e.Y36(C.Q1),e.Y36(k.t2),e.Y36(b._W))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-leadership-team"]],decls:56,vars:14,consts:[[1,"leadership_container"],[1,"search_container"],["type","text","placeholder","Search...",3,"keydown.enter"],["search",""],[3,"settings","source"],[1,"form_container"],[3,"formGroup","ngSubmit"],[1,"form_control"],["for","name"],["type","text","id","name","formControlName","name"],["class","error",4,"ngIf"],["for","designation"],["type","text","id","designation","formControlName","designation"],["for","prod_desc"],["type","text","id","prod_desc","rows","10","formControlName","description"],["for","profile_img"],["type","file","accept",".png,.jpg,.jpeg","id","profile_img","formControlName","profile_img",3,"disabled","change"],["profileImg",""],["class","selected_img_preview",4,"ngIf"],["for","fb_link"],["type","text","id","fb_link","formControlName","fb_link"],["for","insta_link"],["type","text","id","insta_link","formControlName","insta_link"],["for","twitter_link"],["type","text","id","twitter_link","formControlName","twitter_link"],["for","youtube_link"],["type","text","id","youtube_link","formControlName","youtube_link"],["type","submit"],[1,"error"],[4,"ngIf"],[1,"selected_img_preview"],[1,"name"],[1,"icons"],[1,"fas","fa-eye",3,"click"],[1,"fas","fa-times",3,"click"]],template:function(t,n){if(1&t){const o=e.EpF();e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"input",2,3),e.NdJ("keydown.enter",function(){e.CHM(o);const m=e.MAs(3);return n.onSearch(m.value)}),e.qZA(),e.qZA(),e._UZ(4,"ng2-smart-table",4),e._UZ(5,"br"),e._UZ(6,"br"),e._UZ(7,"br"),e.TgZ(8,"div",5),e.TgZ(9,"h5"),e._uU(10),e.qZA(),e.TgZ(11,"form",6),e.NdJ("ngSubmit",function(){return n.onSubmit()}),e.TgZ(12,"div",7),e.TgZ(13,"label",8),e._uU(14,"Name"),e.qZA(),e._UZ(15,"input",9),e.YNc(16,P,2,1,"div",10),e.qZA(),e.TgZ(17,"div",7),e.TgZ(18,"label",11),e._uU(19,"Designation"),e.qZA(),e._UZ(20,"input",12),e.YNc(21,M,2,1,"div",10),e.qZA(),e.TgZ(22,"div",7),e.TgZ(23,"label",13),e._uU(24,"Description"),e.qZA(),e._UZ(25,"textarea",14),e.YNc(26,F,2,1,"div",10),e.qZA(),e.TgZ(27,"div",7),e.TgZ(28,"label",15),e._uU(29,"Profile Image"),e.qZA(),e.TgZ(30,"input",16,17),e.NdJ("change",function(m){return n.uploadImg(m)}),e.qZA(),e.YNc(32,I,2,1,"div",10),e.YNc(33,A,6,1,"div",18),e.qZA(),e.TgZ(34,"div",7),e.TgZ(35,"label",19),e._uU(36,"Facebook Link"),e.qZA(),e._UZ(37,"input",20),e.YNc(38,N,2,1,"div",10),e.qZA(),e.TgZ(39,"div",7),e.TgZ(40,"label",21),e._uU(41,"Instagram Link"),e.qZA(),e._UZ(42,"input",22),e.YNc(43,J,2,1,"div",10),e.qZA(),e.TgZ(44,"div",7),e.TgZ(45,"label",23),e._uU(46,"Twitter Link"),e.qZA(),e._UZ(47,"input",24),e.YNc(48,D,2,1,"div",10),e.qZA(),e.TgZ(49,"div",7),e.TgZ(50,"label",25),e._uU(51,"Youtube Link"),e.qZA(),e._UZ(52,"input",26),e.YNc(53,E,2,1,"div",10),e.qZA(),e.TgZ(54,"button",27),e._uU(55,"Save & Update"),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&t){let o,a,m,c,d,l,p,g;e.xp6(4),e.Q6J("settings",n.settings)("source",n.source),e.xp6(6),e.hij("",n.addEditLabel," Member"),e.xp6(1),e.Q6J("formGroup",n.memberForm),e.xp6(5),e.Q6J("ngIf",((null==(o=n.memberForm.get("name"))?null:o.touched)||(null==(o=n.memberForm.get("name"))?null:o.dirty))&&(null==(o=n.memberForm.get("name"))?null:o.invalid)&&(null==(o=n.memberForm.get("name"))?null:o.errors)),e.xp6(5),e.Q6J("ngIf",((null==(a=n.memberForm.get("designation"))?null:a.touched)||(null==(a=n.memberForm.get("designation"))?null:a.dirty))&&(null==(a=n.memberForm.get("designation"))?null:a.invalid)&&(null==(a=n.memberForm.get("designation"))?null:a.errors)),e.xp6(5),e.Q6J("ngIf",((null==(m=n.memberForm.get("description"))?null:m.touched)||(null==(m=n.memberForm.get("description"))?null:m.dirty))&&(null==(m=n.memberForm.get("description"))?null:m.invalid)&&(null==(m=n.memberForm.get("description"))?null:m.errors)),e.xp6(4),e.Q6J("disabled",n.selectedProfileImg&&n.selectedProfileImg.name),e.xp6(2),e.Q6J("ngIf",((null==(c=n.memberForm.get("profile_img"))?null:c.touched)||(null==(c=n.memberForm.get("profile_img"))?null:c.dirty))&&(null==(c=n.memberForm.get("profile_img"))?null:c.invalid)&&(null==(c=n.memberForm.get("profile_img"))?null:c.errors)),e.xp6(1),e.Q6J("ngIf",n.selectedProfileImg&&n.selectedProfileImg.name),e.xp6(5),e.Q6J("ngIf",((null==(d=n.memberForm.get("fb_link"))?null:d.touched)||(null==(d=n.memberForm.get("fb_link"))?null:d.dirty))&&(null==(d=n.memberForm.get("fb_link"))?null:d.invalid)&&(null==(d=n.memberForm.get("fb_link"))?null:d.errors)),e.xp6(5),e.Q6J("ngIf",((null==(l=n.memberForm.get("insta_link"))?null:l.touched)||(null==(l=n.memberForm.get("insta_link"))?null:l.dirty))&&(null==(l=n.memberForm.get("insta_link"))?null:l.invalid)&&(null==(l=n.memberForm.get("insta_link"))?null:l.errors)),e.xp6(5),e.Q6J("ngIf",((null==(p=n.memberForm.get("twitter_link"))?null:p.touched)||(null==(p=n.memberForm.get("twitter_link"))?null:p.dirty))&&(null==(p=n.memberForm.get("twitter_link"))?null:p.invalid)&&(null==(p=n.memberForm.get("twitter_link"))?null:p.errors)),e.xp6(5),e.Q6J("ngIf",((null==(g=n.memberForm.get("youtube_link"))?null:g.touched)||(null==(g=n.memberForm.get("youtube_link"))?null:g.dirty))&&(null==(g=n.memberForm.get("youtube_link"))?null:g.invalid)&&(null==(g=n.memberForm.get("youtube_link"))?null:g.errors))}},directives:[f.T5,s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,v.O5],styles:[".leadership_container[_ngcontent-%COMP%]{padding:25px}.leadership_container[_ngcontent-%COMP%]   .search_container[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:10px 0}.leadership_container[_ngcontent-%COMP%]   .search_container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:34px;padding:0 15px;outline:none;border:1px solid #d4d4d4;border-radius:5px;color:#000;font-size:13px}.form_container[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:20px;font-weight:400;color:#8a3265;margin-bottom:30px}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:75%}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;grid-gap:5px;gap:5px;margin-bottom:15px}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:15px;font-weight:normal}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], .form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%;outline:none;border:1px solid #d4d5d9;border-radius:5px;padding:0 10px;font-size:14px;font-weight:400;color:#454545;box-sizing:border-box}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, .form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus{box-shadow:0 0 3px 2px #853262b3}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:36px}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form_control[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{font-size:13px;color:#ef0000;font-weight:400}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;outline:none;padding:12px 26px;margin:25px 0 0 auto;color:#fff;background:#8a3265;border-radius:20px;font-size:15px;font-weight:500;display:block;cursor:pointer}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .selected_img_preview[_ngcontent-%COMP%]{padding:15px 20px;border:1px solid #e4e5e9;border-radius:10px;box-shadow:1px 1px 6px #0003;display:flex;justify-content:space-between}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .selected_img_preview[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{display:flex;grid-gap:25px;gap:25px}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .selected_img_preview[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{cursor:pointer}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .selected_img_preview[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .fa-eye[_ngcontent-%COMP%]{color:#8a3265}.form_container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .selected_img_preview[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .fa-times[_ngcontent-%COMP%]{color:#ec2525}  .ng2-smart-filters{display:none!important}  ng2-smart-table table{border:1px solid #e4e5e9}  ng2-smart-table thead{background:#8a3265}  ng2-smart-table td{text-align:center}  .ng2-smart-title,   ng2-smart-table-title a{color:#fff!important}  .ng2-smart-title:hover,   ng2-smart-table-title a:hover{text-decoration:none!important}  .ng2-smart-title:after,   ng2-smart-table-title a:after{border-bottom-color:#fff!important}  .ng2-smart-row{border-top:1px solid #e4e5e9}  table-cell-view-mode{text-align:center}  table-cell-view-mode .text div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}  ng2-st-tbody-edit-delete{display:flex!important;justify-content:space-around!important}  ng2-st-tbody-edit-delete a{color:#8a3265!important}"]}),i})(),j=(()=>{class i{constructor(){this.onEdit=new e.vpe,this.onDelete=new e.vpe}ngOnInit(){}edit(){this.onEdit.emit(this.rowData)}delete(){this.onDelete.emit(this.rowData)}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-leadership-action"]],inputs:{rowData:"rowData"},outputs:{onEdit:"onEdit",onDelete:"onDelete"},decls:5,vars:0,consts:[[1,"actions"],[3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"a",1),e.NdJ("click",function(){return n.edit()}),e._uU(2,"Edit"),e.qZA(),e.TgZ(3,"a",1),e.NdJ("click",function(){return n.delete()}),e._uU(4,"Delete"),e.qZA(),e.qZA())},styles:[Z]}),i})(),z=(()=>{class i{ngOnInit(){}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-profile-image"]],inputs:{rowData:"rowData"},decls:3,vars:2,consts:[[1,"actions"],["target","_blank",3,"href"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"a",1),e._uU(2),e.qZA(),e.qZA()),2&t&&(e.xp6(1),e.Q6J("href",n.rowData.image.fileUrl,e.LSH),e.xp6(1),e.Oqu(n.rowData.image.name))},styles:[Z]}),i})();var x=u(3736);const R=[{path:"",component:S}];let B=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[x.Bz.forChild(R)],x.Bz]}),i})(),H=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[v.ez,B,f.ne,s.u5,s.UX,T.yb,C.TE,b.Rh]]}),i})()}}]);