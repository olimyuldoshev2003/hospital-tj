import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Hospital = () => {
  const { id } = useParams();

  const [hospital, setHospital] = useState([]);
  const [dataHospital, setDataHospital] = useState([]);
  const [dataService, setDataService] = useState([]);
  const [services, setServices] = useState([]);
  const [comment, setComment] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  async function getHospitalsByCategory() {
    setLoadingHospitals(true);
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/hospitals/`
      );
      setHospitals(data.results);
      setDataHospital(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHospitals(false);
    }
  }

  async function getCommentsById() {
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/hospitals/${id}/comments/`
      );
      setComment(data.results);
    } catch (error) {}
  }

  async function getServices() {
    setLoadingServices(true);
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/services/?hospital=${id}`
      );
      setServices(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingServices(false);
    }
  }

  useEffect(() => {
    getHospitalsByCategory();
    getServices();
    getCommentsById();
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
          className="section_1 bg-no-repeat bg-cover bg-center min-h-[550px] relative"
          style={{
            backgroundImage: `url(${hospital.big_image})`,
          }}
        >
          <div className="block_s_1 absolute right-[20px] bottom-[20px] flex items-center gap-3">
            <div className="comments_1 bg-[#1c9c75] w-[150px] p-[10px] rounded-[9px]">
              <h3 className="text-[#fff] text-[13.4px] text-center">{comment[0]?.text}</h3>
            </div>
            {/* <div className="comments_2">
              <h3 className="text-[#fff] bg-[#1c9c75] w-[120px] p-[10px] rounded-[9px]">
                {comment[0].text}
              </h3>
            </div> */}
          </div>
        </section>
        <section className="section_2 mt-[30px] max-w-[1440px] m-[0_auto] px-[30px]">
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
        <section className="section_3">
          <div className="for_h1 mt-[30px] flex justify-center gap-5 flex-wrap items-center">
            <h1 className="text-center text-[20px] font-[500]">
              Сервисы от этого клиника
            </h1>
          </div>
          <div
            className={`services ${
              services.length ? `bg-[#edecec]` : `bg-transparent`
            } mt-[30px] max-w-[1440px] m-[0_auto] p-[10px] rounded-[20px] px-[20px] flex flex-col gap-2`}
          >
            {loadingServices === false ? (
              services.map((item) => {
                return (
                  <div
                    key={item.slug}
                    className=" bg-[#fff] rounded-[20px] p-[10px]"
                  >
                    <div className="block_1_service">
                      <h1 className="text-[17px] text-[gray]">
                        * {item.average_rank}
                      </h1>
                    </div>
                    <div className="block_2_service">
                      <h1 className="text-[23px] font-[500]">{item.name}</h1>
                    </div>
                    <div className="block_3_service">
                      <h1 className="text-[16px] font-[600] bg-[#edecec] p-[1px_5px] rounded-[3px] md:w-[max-content] sm:max-w-[340px]">
                        {item.price !== 0
                          ? `Цена: ${item.price}`
                          : `Минимальный: ${item.min_price}, Максимальный: ${item.max_price}`}
                      </h1>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>...Загрузка</h1>
              </div>
            )}
            {services.length === 0 && loadingServices === false ? (
              <div>
                <h1 className="text-[20px] font-[500] text-[#2e2e2e]">
                  В этой клинике нет никаких услуг
                </h1>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default Hospital;
