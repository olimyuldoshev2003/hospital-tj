import React, { useEffect, useState } from "react";

//For images
import imgHospital from "../../assets/hospital.jpg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const { id } = useParams();

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
        `https://hospitaltj.pythonanywhere.com/api/v1/hospitals/?category=${id}`
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

  return (
    <>
      <div className="page_category mt-[60px]">
        <div className="for_h1_and_p max-w-[1440px] m-[0_auto] text-center">
          <h1 className="text-[40px] font-[500]"> Категория - {id}</h1>
          <p className="text-[20px] font-[400]">
            Найдено {dataHospital.length} клиник, {dataService.length} сервисов
          </p>
        </div>
        <section className="section_1 mt-[30px] px-[30px] sm:justify-center flex md:justify-start flex-wrap gap-6 max-w-[1440px] m-[0_auto]">
          {loadingHospitals === false ? (
            hospitals.map((item) => {
              return (
                <Link to={`/hospitals/${item.slug}`}>
                  <div
                    className="hospitals relative w-[max-content]
            cursor-pointer"
                    key={item.slug}
                  >
                    <img
                      src={item.small_image}
                      className="w-[300px] h-[450px]  rounded-[10px]"
                      alt=""
                    />
                    <h1 className="absolute top-[15px] text-[#000] left-[17px] text-[22px] font-[500]">
                      {item.name}
                    </h1>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>
              <h1>...Загрузка</h1>
            </div>
          )}
          {hospitals.length === 0 && loadingHospitals === false ? (
            <div>
              <h1 className="text-[20px] font-[500] text-[#2e2e2e]">
                В этой категории нет никаких клиники
              </h1>
            </div>
          ) : null}
        </section>
        <section
          className={`section_2 ${
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
        </section>
      </div>
    </>
  );
};

export default Category;
