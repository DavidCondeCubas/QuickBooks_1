/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ParentWeb;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 *
 * @author Norhan
 */
public class DBConect {

    public static Connection cn;
    public static Connection cn2;
    public static Connection cn3;
    public static Connection cnTest;

    public static Statement eduwebTest;
    public static Statement eduweb;
    public static Statement ah;
    public static Statement eduwebBeforeFirst;

    private Object getBean(String nombrebean, ServletContext servlet) {
        ApplicationContext contexto = WebApplicationContextUtils.getRequiredWebApplicationContext(servlet);
        Object beanobject = contexto.getBean(nombrebean);
        return beanobject;
    }

    public static void close() throws SQLException {
        if (cn != null) {
            cn.close();
        }
        if (cn2 != null) {
            cn2.close();
        }
        if (cn3 != null) {
            cn3.close();
        }
        if (cnTest != null) {
            cnTest.close();
        }
    }

    public DBConect(HttpServletRequest hsr, HttpServletResponse hsr1) throws Exception {
        //connection to comunication
        DriverManagerDataSource dataSource = (DriverManagerDataSource) this.getBean("dataSource", hsr.getServletContext());
        if (this.cn != null) {
            this.cn.close();
        }
        this.cn = dataSource.getConnection();
        eduweb = this.cn.createStatement();
        //connection to datasourceAH
        DriverManagerDataSource dataSource2 = (DriverManagerDataSource) this.getBean("dataSourceAH", hsr.getServletContext());
        if (this.cn2 != null) {
            this.cn2.close();
        }
        this.cn2 = dataSource2.getConnection();
        this.ah = cn2.createStatement();
        //connection to comunication
        DriverManagerDataSource dataSource3 = (DriverManagerDataSource) this.getBean("dataSource", hsr.getServletContext());
        if (this.cn3 != null) {
            this.cn3.close();
        }
        this.cn3 = dataSource3.getConnection();
        eduwebBeforeFirst = this.cn3.createStatement(1004, 1007);
              //connection to datasourceAH
              
        DriverManagerDataSource dataSource4 = (DriverManagerDataSource) this.getBean("dataSourceTest", hsr.getServletContext());
        if (this.cnTest != null) {
            this.cnTest.close();
        }
        this.cnTest = dataSource4.getConnection();
        this.eduwebTest = cnTest.createStatement();
    }
}
