(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{174:function(e,t,i){},260:function(e,t,i){},329:function(e,t,i){},330:function(e,t,i){"use strict";i.r(t);var n=i(0),o=i.n(n),c=i(24),a=i.n(c),r=(i(174),i(57)),s=i(49),l=i.n(s),u=i(333),h=i(334),d=i(94),j=i(7),p=u.a.Search,b=function(e){var t=e.setData,i=e.data;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)(s.Header,{style:{position:"fixed",zIndex:1,width:"100vw",height:"10vh",padding:0,display:"flex",justifyContent:"space-between"},children:[Object(j.jsx)("div",{style:{display:"flex",minWidth:"200px",color:"white"},children:Object(j.jsx)("p",{children:"Logo"})}),Object(j.jsx)("div",{style:{display:"flex",minWidth:"200px",color:"white"},children:Object(j.jsx)(p,{placeholder:"Rechercher un bien",onSearch:function(e){return function(e){var n=[];i.map((function(t){return(null==e||t.Title.toUpperCase().includes(e.toUpperCase()))&&n.push(t),null})),t(n)}(e)},style:{width:200}})}),Object(j.jsx)(h.a,{mode:"horizontal",theme:"dark",children:Object(j.jsx)(h.a.Item,{children:Object(j.jsx)(d.b,{to:"/login",children:"Connexion"})},"1")})]})})},x=i(123),O=i.n(x),m=i(163),f=i(53),T=i(164),v=i.n(T),y=i(335),P=function(e){var t=e.data,i=e.visible,n=e.setVisible;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)(y.a,{title:t.Title,centered:!0,visible:i,width:1e3,onCancel:function(){return n(!1)},footer:[Object(j.jsx)(f.a,{onClick:function(){return n(!1)},children:"Retour"},"back"),Object(j.jsx)(f.a,{type:"primary",onClick:function(){return n(!1)},children:"R\xe9server"},"submit")],children:[Object(j.jsxs)("p",{children:["Titre : ",t.Title]}),Object(j.jsxs)("p",{children:["Localisation : ",t.Location]}),Object(j.jsxs)("p",{children:["Type : ",t.Type]}),Object(j.jsxs)("p",{children:["Tarif : ",t.Tarif]}),Object(j.jsxs)("p",{children:["Photo : ",t.Photo]}),Object(j.jsxs)("p",{children:["Description : ",t.Description]})]})})},g=function(e){var t,i,o,c,a,l,u=e.displayedData,h=Object(n.useState)(!1),d=Object(r.a)(h,2),p=d[0],b=d[1],x=Object(n.useState)(1),T=Object(r.a)(x,2),y=T[0],g=T[1],D=Object(n.useState)({Location:"",Title:"",Description:"",Type:"",Tarif:"",Photo:""}),L=Object(r.a)(D,2),w=L[0],C=L[1];return Object(n.useEffect)((function(){(function(){var e=Object(m.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v()("http://localhost:5000/");case 2:t=e.sent,C({Location:t.data.Location,Title:t.data.Title,Type:t.data.Type,Tarif:t.data.Tarif,Photo:t.data.Photo,Description:t.data.Description}),console.log(w);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()})),Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)(s.Content,{style:{paddingTop:"10vh"},children:[u.length>0?u.map((function(e,t){return null!=e?Object(j.jsxs)("div",{className:"listeRechercheBien",children:[null===e||void 0===e?void 0:e.Location," : ",null===e||void 0===e?void 0:e.Title,Object(j.jsx)(f.a,{type:"primary",onClick:function(){return function(e){g(e),b(!0)}(t)},className:"buttonVisu",children:"Visualisation d'un bien"})]},t):null})):Object(j.jsx)("p",{children:"Aucun r\xe9sultat trouv\xe9"}),p&&null!=u?Object(j.jsx)(P,{data:{Location:null===(t=u[y])||void 0===t?void 0:t.Location,Title:null===(i=u[y])||void 0===i?void 0:i.Title,Type:null===(o=u[y])||void 0===o?void 0:o.Type,Tarif:null===(c=u[y])||void 0===c?void 0:c.Tarif,Photo:null===(a=u[y])||void 0===a?void 0:a.Photo,Description:null===(l=u[y])||void 0===l?void 0:l.Description},visible:p,setVisible:b}):null]})})},D=i(25),L=i(332),w=i(336),C=(i(260),function(e){e.setToken;return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{style:{position:"relative"},children:Object(j.jsx)(s.Content,{style:{position:"absolute",height:"500px",width:"500px",margin:"auto",padding:0,top:"50vh"},children:Object(j.jsxs)(L.a,{name:"basic",initialValues:{remember:!0},onFinish:function(e){console.log("Success:",e)},onFinishFailed:function(e){console.log("Failed:",e)},children:[Object(j.jsx)(L.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(j.jsx)(u.a,{})}),Object(j.jsx)(L.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(j.jsx)(u.a.Password,{})}),Object(j.jsx)(L.a.Item,{name:"remember",valuePropName:"checked",children:Object(j.jsx)(w.a,{children:"Remember me"})}),Object(j.jsx)(L.a.Item,{children:Object(j.jsx)(f.a,{type:"primary",htmlType:"submit",className:"loginContent",children:"Submit"})})]})})})})});var V=function(){var e=[{Location:"Annecy",Title:"Incroyable Audi R8",Description:"Beau et pas cher",Type:"Vehicule",Tarif:20,Photo:"Photo"},{Location:"Lyon",Title:"Petite 206",Description:"Beau et pas cher",Type:"Vehicule",Tarif:20,Photo:"Photo"},{Location:"Marseille",Title:"Range rover",Description:"Beau et pas cher",Type:"Vehicule",Tarif:20,Photo:"Photo"},{Location:"Paris",Title:"Opel astra",Description:"Beau et pas cher",Type:"Vehicule",Tarif:20,Photo:"Photo"},{Location:"Montpellier",Title:"Tout terrain",Description:"Beau et pas cher",Type:"Vehicule",Tarif:20,Photo:"Photo"},{Location:"Avignon",Title:"Carrosse pour mariage",Description:"Beau et pas cher",Type:"Vehicule",Tarif:20,Photo:"Photo"},{Location:"Valence",Title:"Caravane de luxe",Description:"Beau et pas cher",Type:"Vehicule",Tarif:20,Photo:"Photo"}],t=Object(n.useState)(e),i=Object(r.a)(t,2),o=i[0],c=i[1],a=Object(n.useState)(),s=Object(r.a)(a,2),u=(s[0],s[1]);return Object(j.jsx)(l.a,{style:{height:"100vh"},children:Object(j.jsxs)(d.a,{children:[Object(j.jsx)(D.a,{exact:!0,path:"/",component:function(){return Object(j.jsxs)("div",{children:[Object(j.jsx)(b,{setData:c,data:e}),";",Object(j.jsx)(g,{displayedData:o}),";"]})}}),Object(j.jsx)(D.a,{path:"/login",component:function(){return Object(j.jsx)(C,{setToken:u})}})]})})};i(328),i(329);a.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(V,{})}),document.getElementById("root"))}},[[330,1,2]]]);
//# sourceMappingURL=main.7c0b2c44.chunk.js.map