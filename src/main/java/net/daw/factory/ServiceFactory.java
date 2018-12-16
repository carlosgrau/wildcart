package net.daw.factory;

import javax.servlet.http.HttpServletRequest;

import net.daw.bean.beanImplementation.ReplyBean;
import net.daw.bean.beanImplementation.UsuarioBean;
import net.daw.service.CarritoService;
import net.daw.service.FacturaService;
import net.daw.service.LineaService;
import net.daw.service.ProductoService;
import net.daw.service.TipoproductoService;
import net.daw.service.TipousuarioService;
import net.daw.service.UsuarioService;

public class ServiceFactory {

    public static ReplyBean executeService(HttpServletRequest oRequest) throws Exception {

        String ob = oRequest.getParameter("ob");
        String op = oRequest.getParameter("op");
        ReplyBean oReplyBean = null;

        if (ob.equals("usuario") && op.equals("login")) {
            UsuarioService oUsuarioService = new UsuarioService(oRequest);
            oReplyBean = oUsuarioService.login();
        } else {

            UsuarioBean sesion = (UsuarioBean) oRequest.getSession().getAttribute("user");

            switch (sesion.getObj_tipoUsuario().getId()) {
                case 1:
                    switch (ob) {
                        case "carrito":
                            CarritoService oCarritoService = new CarritoService(oRequest);
                            switch (op) {
                                case "add":
                                    oReplyBean = oCarritoService.add();
                                    break;
                                case "empty":
                                    oReplyBean = oCarritoService.empty();
                                    break;
                                case "show":
                                    oReplyBean = oCarritoService.show();
                                    break;
                                case "reduce":
                                    oReplyBean = oCarritoService.reduce();
                                    break;
                                case "update":
                                    oReplyBean = oCarritoService.update();
                                    break;
                                case "buy":
                                    oReplyBean = oCarritoService.buy();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        case "tipousuario":
                            TipousuarioService oTipousuarioService = new TipousuarioService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oTipousuarioService.get();
                                    break;
                                case "getbydesc":
                                    oReplyBean = oTipousuarioService.getbydesc();
                                    break;
                                case "create":
                                    oReplyBean = oTipousuarioService.create();
                                    break;
                                case "update":
                                    oReplyBean = oTipousuarioService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oTipousuarioService.remove();
                                    break;
                                case "getcount":
                                    oReplyBean = oTipousuarioService.getcount();
                                    break;
                                case "getpage":
                                    oReplyBean = oTipousuarioService.getpage();
                                    break;
                                /* case "fill":
                                    oReplyBean = oTipousuarioService.fill();
                                    break;*/
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        case "usuario":
                            UsuarioService oUsuarioService = new UsuarioService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oUsuarioService.get();
                                    break;
                                case "create":
                                    oReplyBean = oUsuarioService.create();
                                    break;
                                case "update":
                                    oReplyBean = oUsuarioService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oUsuarioService.remove();
                                    break;
                                case "getcount":
                                    oReplyBean = oUsuarioService.getcount();
                                    break;
                                case "getpage":
                                    oReplyBean = oUsuarioService.getpage();
                                    break;
                                case "fill":
                                    oReplyBean = oUsuarioService.fill();
                                    break;
                                case "login":
                                    oReplyBean = oUsuarioService.login();
                                    break;
                                case "logout":
                                    oReplyBean = oUsuarioService.logout();
                                    break;
                                case "check":
                                    oReplyBean = oUsuarioService.check();
                                    break;
                                /*case "updatepass":
                                    oReplyBean = oUsuarioService.updatePass();
                                    break;*/
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        case "factura":
                            FacturaService oFacturaService = new FacturaService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oFacturaService.get();
                                    break;
                                case "getbyidusuario":
                                    oReplyBean = oFacturaService.getbyidusuario();
                                    break;
                                case "create":
                                    oReplyBean = oFacturaService.create();
                                    break;
                                case "update":
                                    oReplyBean = oFacturaService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oFacturaService.remove();
                                    break;
                                case "getcount":
                                    oReplyBean = oFacturaService.getcount();
                                    break;
                                case "getcountfacuser":
                                    oReplyBean = oFacturaService.getcountFacturaUser();
                                    break;
                                case "getpage":
                                    oReplyBean = oFacturaService.getpage();
                                    break;
                                case "getpagexusuario":
                                    oReplyBean = oFacturaService.getpageXusuario();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        case "linea":
                            LineaService oLineaService = new LineaService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oLineaService.get();
                                    break;
                                case "create":
                                    oReplyBean = oLineaService.create();
                                    break;
                                case "update":
                                    oReplyBean = oLineaService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oLineaService.remove();
                                    break;
                                case "getcount":
                                    oReplyBean = oLineaService.getcount();
                                    break;
                                case "getpage":
                                    oReplyBean = oLineaService.getpage();
                                    break;
                                case "getlineafactura":
                                    oReplyBean = oLineaService.getLineaFactura();
                                    break;
                                case "getcountxlinea":
                                    oReplyBean = oLineaService.getcountxlinea();
                                    break;
                                /* case "fill":
                                    oReplyBean = oLineaService.fill();
                                    break;*/
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;

                        case "producto":
                            ProductoService oProductoService = new ProductoService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oProductoService.get();
                                    break;
                                case "create":
                                    oReplyBean = oProductoService.create();
                                    break;
                                case "update":
                                    oReplyBean = oProductoService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oProductoService.remove();
                                    break;
                                case "getcount":
                                    oReplyBean = oProductoService.getcount();
                                    break;
                                case "getpage":
                                    oReplyBean = oProductoService.getpage();
                                    break;
                                case "fill":
                                    oReplyBean = oProductoService.loaddata();
                                    break;
                                case "addimage":
                                    oReplyBean = oProductoService.loadimage();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        case "tipoproducto":
                            TipoproductoService oTipoproductoService = new TipoproductoService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oTipoproductoService.get();
                                    break;
                                case "create":
                                    oReplyBean = oTipoproductoService.create();
                                    break;
                                case "update":
                                    oReplyBean = oTipoproductoService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oTipoproductoService.remove();
                                    break;
                                case "getcount":
                                    oReplyBean = oTipoproductoService.getcount();
                                    break;
                                case "getpage":
                                    oReplyBean = oTipoproductoService.getpage();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        default:
                            oReplyBean = new ReplyBean(500, "Object doesn't exist");
                            break;
                    }
                    break;
                case 2:
                    switch (ob) {
                        case "carrito":
                            CarritoService oCarritoService = new CarritoService(oRequest);
                            switch (op) {
                                case "add":
                                    oReplyBean = oCarritoService.add();
                                    break;
                                case "empty":
                                    oReplyBean = oCarritoService.empty();
                                    break;
                                case "show":
                                    oReplyBean = oCarritoService.show();
                                    break;
                                case "reduce":
                                    oReplyBean = oCarritoService.reduce();
                                    break;
                                case "update":
                                    oReplyBean = oCarritoService.update();
                                    break;
                                case "buy":
                                    oReplyBean = oCarritoService.buy();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;

                        case "usuario":
                            UsuarioService oUsuarioService = new UsuarioService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oUsuarioService.get();
                                    break;
                                case "update":
                                    oReplyBean = oUsuarioService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oUsuarioService.remove();
                                    break;
                                case "fill":
                                    oReplyBean = oUsuarioService.fill();
                                    break;
                                case "login":
                                    oReplyBean = oUsuarioService.login();
                                    break;
                                case "logout":
                                    oReplyBean = oUsuarioService.logout();
                                    break;
                                case "check":
                                    oReplyBean = oUsuarioService.check();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        case "factura":
                            FacturaService oFacturaService = new FacturaService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oFacturaService.get();
                                    break;
                                case "getcountfacuser":
                                    oReplyBean = oFacturaService.getcountFacturaUser();
                                    break;
                                case "getpagexusuario":
                                    oReplyBean = oFacturaService.getpageXusuario();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                        case "linea":
                            LineaService oLineaService = new LineaService(oRequest);
                            String pene = "pene caca culo pedo pis-" + oRequest.getParameter("id");
                            switch (op) {
                                case "get":
                                    oReplyBean = oLineaService.get();
                                    break;
                                case "getpage":
                                    oReplyBean = oLineaService.getpage();
                                    break;
                                case "getlineafactura":
                                    oReplyBean = oLineaService.getLineaFactura();
                                    break;
                                case "getcountxlinea":
                                    oReplyBean = oLineaService.getcountxlinea();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;

                        case "producto":
                            ProductoService oProductoService = new ProductoService(oRequest);
                            switch (op) {
                                case "get":
                                    oReplyBean = oProductoService.get();
                                    break;
                                case "create":
                                    oReplyBean = oProductoService.create();
                                    break;
                                case "update":
                                    oReplyBean = oProductoService.update();
                                    break;
                                case "remove":
                                    oReplyBean = oProductoService.remove();
                                    break;
                                case "getcount":
                                    oReplyBean = oProductoService.getcount();
                                    break;
                                case "getpage":
                                    oReplyBean = oProductoService.getpage();
                                    break;
                                case "fill":
                                    oReplyBean = oProductoService.loaddata();
                                    break;
                                case "addimage":
                                    oReplyBean = oProductoService.loadimage();
                                    break;
                                default:
                                    oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                                    break;
                            }
                            break;
                    }
                    break;
                default:
                    oReplyBean = new ReplyBean(500, "Error Permisos");
            }
        }
        return oReplyBean;
    }

}
