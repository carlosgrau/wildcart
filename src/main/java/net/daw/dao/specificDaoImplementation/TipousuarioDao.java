package net.daw.dao.specificDaoImplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import net.daw.bean.beanImplementation.TipousuarioBean;
import net.daw.dao.genericDaoImplementation.GenericDaoImplementation;
import net.daw.dao.publicDaoInterface.DaoInterface;

public class TipousuarioDao extends GenericDaoImplementation implements DaoInterface {

    public TipousuarioDao(Connection oConnection, String ob,HttpServletRequest oRequest) {
        super(oConnection, ob,oRequest);

    }

    public TipousuarioBean getbydesc(String desc, Integer expand,HttpServletRequest oRequest) throws Exception {
        String strSQL = "SELECT * FROM " + ob + " WHERE " + ob + ".desc like '%" + desc + "%'";
        TipousuarioBean oTipousuarioBean;
        ResultSet oResultSet = null;
        PreparedStatement oPreparedStatement = null;
        try {
            oPreparedStatement = oConnection.prepareStatement(strSQL);
            oResultSet = oPreparedStatement.executeQuery();
            if (oResultSet.next()) {
                oTipousuarioBean = new TipousuarioBean();

                oTipousuarioBean.fill(oResultSet, oConnection, expand,oRequest);

            } else {
                oTipousuarioBean = null;
            }
        } catch (SQLException e) {
            throw new Exception("Error en Dao get de " + ob, e);
        } finally {
            if (oResultSet != null) {
                oResultSet.close();
            }
            if (oPreparedStatement != null) {
                oPreparedStatement.close();
            }
        }
        return oTipousuarioBean;
    }
}
