import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const HospitalByCategory = () => {
  const { id } = useParams();

  const [hospital, setHospital] = useState([]);
  const [dataHospital, setDataHospital] = useState([]);
  const [dataService, setDataService] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  async function getHospitalsByCategory() {
    setLoadingHospitals(true);
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/hospitals/`
      );
      setHospitals(data);
      setDataHospital(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHospitals(false);
    }
  }

  async function getServices() {
    setLoadingServices(true);
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/services/?hospital=${id}`
      );
      setServices(data);
      setDataService(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingServices(false);
    }
  }

  useEffect(() => {
    getHospitalsByCategory();
    getServices();
  }, []);

  async function getHospitalById() {
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/hospitals/${id}/`
      );

      setHospital(data);
    } catch (error) {}
  }

  useEffect(() => {
    getHospitalById();
  }, []);
  return (
    <>
      <div className="page_hospital">
        <section
          className="section_1 bg-no-repeat bg-cover min-h-[550px]"
          style={{
            backgroundImage: `url(${hospital.big_image})`,
          }}
        >
          <div className="block_s_1">
            <div className="comments_1"></div>
            <div className="comments_2"></div>
          </div>
        </section>
        <section className="section_2 mt-[30px] max-[1440px] m-[0_auto] px-[30px]">
          <h1 className="text-center text-[30px] font-[500]">
            {hospital.name}
          </h1>
          <h3 className="text-[17px] max-w-[500px] font-[400]">
            <span className="font-bold">Описание:</span> {hospital.description}
          </h3>
          <h3 className="mt-[10px] font-[400] text-[17px]">
            <span className="font-bold">Время работы:</span>{" "}
            {hospital.work_time}
          </h3>
        </section>
      </div>
    </>
  );
};

export default HospitalByCategory;
