import React, { useEffect, useState } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpdatedExchangeRates,
  fetchExchangeRates,
} from "../redux/actions/currency";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";

const AdminCurrencyManagement = () => {
  const dispatch = useDispatch();

  const { currencies } = useSelector((state) => state.currency);
  const [rows, setRows] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchCurrencies = async () => {
    setLoading(true);
    try {
      await dispatch(fetchExchangeRates());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const updateRates = async () => {
    setLoading(true);
    try {
      await dispatch(fetchUpdatedExchangeRates());
      toast.success("Exchange rate updated successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch updated exchange rate!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (currencies.length > 0) {
      let currencyData = currencies?.map((item, index) => {
        return {
          sno: index + 1,
          id: item._id,
          code: item?.code,
          alphaCode: item?.alphaCode,
          numericCode: item?.numericCode,
          name: item?.name,
          rate: item?.rate,
          date: item?.date,
          inverseRate: item?.inverseRate,
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
        };
      });

      setRows(currencyData);
    }
  }, [currencies]);

  const columns = [
    {
      field: "sno",
      headerName: "#",
      minWidth: 50,
      flex: 0.7,
      Cell: (row) => <span>{row?.index + 1}</span>,
    },
    {
      field: "code",
      headerName: "Currency",
      type: "string",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "alphaCode",
      headerName: "Symbol",
      type: "string",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "rate",
      headerName: "Exchange Rate",
      type: "number",
      minWidth: 150,
      flex: 0.8,
    },
    {
      field: "updatedAt",
      headerName: "Last Updated At",
      type: "string",
      minWidth: 150,
      flex: 0.8,
    },
  ];

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={9} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex items-center flex-col gap-6">
            <div className="flex w-full justify-end">
              <Button
                loading={isLoading}
                variant="contained"
                onClick={updateRates}
              >
                Get Updated Rates
              </Button>
            </div>
            <div className="w-[97%] flex justify-center">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCurrencyManagement;
