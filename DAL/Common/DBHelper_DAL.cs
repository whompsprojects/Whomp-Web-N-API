using DTO;
using Microsoft.ApplicationBlocks.Data;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DAL.Common
{
    public class DBHelper
    {

        #region ExecuteDataSet
        /// <summary>
        /// To get dataset from db 
        /// </summary>
        /// <param name="strProcedureName"></param>
        /// <param name="sqlParameterList"></param>
        /// <param name="isWithTransaction"></param>
        /// <returns></returns>
        public DataSet ExecuteDataSet(string strProcedureName, SqlParameter[] sqlParameterList, bool isWithTransaction=false)
        {
            var ds = new DataSet();
            SqlTransaction trans = null;
            try
            {
                if (objSqlConnection.State == ConnectionState.Closed)
                    objSqlConnection.Open();

                if (isWithTransaction)
                {
                    trans = objSqlConnection.BeginTransaction();
                    ds = SqlHelper.ExecuteDataset(trans, CommandType.StoredProcedure, strProcedureName, sqlParameterList);
                }
                else
                    ds = SqlHelper.ExecuteDataset(objSqlConnection, CommandType.StoredProcedure, strProcedureName, sqlParameterList);
                if (isWithTransaction)
                    trans.Commit();
            }
            catch (Exception ex)
            {
                if (isWithTransaction)
                    trans.Rollback();
                throw ex;
            }
            finally
            {
                objSqlConnection.Close();
            }
            return ds;
        }
        #endregion ExecuteDataSet

        #region ExecuteNonQuery
        public int ExecuteNonQuery(string strProcedureName, SqlParameter[] sqlParameterList, bool isWithTransaction=false)
        {
            var NoofRowEffected = 0;
            SqlTransaction trans = null;
            try
            {
                if (objSqlConnection.State == ConnectionState.Closed)
                    objSqlConnection.Open();

                if (isWithTransaction)
                {
                    trans = objSqlConnection.BeginTransaction();
                    NoofRowEffected = SqlHelper.ExecuteNonQuery(trans, strProcedureName, sqlParameterList);
                }
                else
                    NoofRowEffected = SqlHelper.ExecuteNonQuery(objSqlConnection, strProcedureName, sqlParameterList);
                if (isWithTransaction)
                    trans.Commit();
            }
            catch (Exception ex)
            {
                if (isWithTransaction)
                    trans.Rollback();
                throw ex;
            }
            finally
            {
                objSqlConnection.Close();
            }
            return NoofRowEffected;
        }
        #endregion ExecuteNonQuery

        #region ExecuteScalar
        public object ExecuteScalar(string strProcedureName, SqlParameter[] sqlParameterList, bool isWithTransaction)
        {
            object obj = null;
            SqlTransaction trans = null;
            try
            {
                if (objSqlConnection.State == ConnectionState.Closed)
                    objSqlConnection.Open();

                if (isWithTransaction)
                {
                    trans = objSqlConnection.BeginTransaction();
                    obj = SqlHelper.ExecuteScalar(trans, CommandType.StoredProcedure, strProcedureName, sqlParameterList);
                }
                else
                    obj = SqlHelper.ExecuteScalar(objSqlConnection, CommandType.StoredProcedure, strProcedureName, sqlParameterList);
                if (isWithTransaction)
                    trans.Commit();
            }
            catch (Exception ex)
            {
                if (isWithTransaction)
                    trans.Rollback();
                throw ex;
            }
            finally
            {
                objSqlConnection.Close();
            }
            return obj;
        }
        #endregion ExecuteScalar

        #region ExecuteDataTable
        public DataTable ExecuteDataTable(string strProcedureName, SqlParameter[] sqlParameterList, bool isWithTransaction=false)
        {
            var dt = new DataTable();
            SqlDataReader dr = null;
            SqlTransaction trans = null;
            try
            {
                if (objSqlConnection.State == ConnectionState.Closed)
                    objSqlConnection.Open();

                if (isWithTransaction)
                {
                    trans = objSqlConnection.BeginTransaction();
                    dr = SqlHelper.ExecuteReader(trans, CommandType.StoredProcedure, strProcedureName, sqlParameterList);
                    dt.Load(dr);
                }
                else
                {
                    dr = SqlHelper.ExecuteReader(objSqlConnection, CommandType.StoredProcedure, strProcedureName, sqlParameterList);
                    dt.Load(dr);
                }
                if (isWithTransaction)
                    trans.Commit();
            }
            catch (Exception ex)
            {
                if (isWithTransaction)
                    trans.Rollback();
                throw ex;
            }
            finally
            {
                objSqlConnection.Close();
            }
            return dt;
        }
        #endregion ExecuteDataTable

        #region[Private Variable]
        private string _ConnectionString;
        private SqlCommand objSqlCommand;
        private SqlConnection objSqlConnection;

        #endregion

        #region[Public Properties]
        private String ConnectionString
        {
            get { return _ConnectionString; }
            set { _ConnectionString = value; }

        }
        #endregion

        #region Constructor
        public DBHelper()
        {
            SqlConnection.ClearAllPools();
            objSqlConnection = new SqlConnection();
            objSqlConnection.ConnectionString = Constant.DBQueryString;
            objSqlCommand = new SqlCommand();
            objSqlCommand.Connection = objSqlConnection;
            objSqlCommand.CommandTimeout = 5000000;
            objSqlConnection.Open();
        }
        #endregion Constructor

    }
}
