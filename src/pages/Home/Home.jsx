import React, { useEffect, useState } from "react";
import axios from "axios";

//For images
import { Link } from "react-router-dom";

const Home = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  async function getHospitals() {
    setLoadingHospitals(true);
    try {
      const { data } = await axios.get(
        "https://myhospitalproject.pythonanywhere.com/api/v1/hospitals/?is_on_main=True"
      );

      setHospitals(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHospitals(false);
    }
  }

  async function getCategories() {
    setLoadingCategories(true);
    try {
      const { data } = await axios.get(
        "https://myhospitalproject.pythonanywhere.com/api/v1/categories/"
      );

      setCategories(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  }

  useEffect(() => {
    getHospitals();
    getCategories();
  }, []);

  return (
    <>
      <div className="home">
        <section className="section_1 flex justify-center items-center flex-col h-[550px]">
          <h1 className="sm:text-[36px] md:text-[50px] font-[400]">
            Найдите клинику себе по душе
          </h1>
          <div className="for_btn mt-[20px]">
            <Link to={`/hospitals`}>
              <button className="p-[16px_50px] bg-[#000] text-[#fff] rounded-[5px] w-[240px]">
                Искать
              </button>
            </Link>
          </div>
        </section>

        <section className="section_2 px-[30px] justify-center flex flex-wrap gap-3 max-w-[1440px] m-[0_auto]">
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
                      className="w-[300px] h-[450px] rounded-[10px]"
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
              <h1>Загрузка...</h1>
            </div>
          )}

          <div className="categories grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3">
            {loadingCategories === false ? (
              categories.slice(0, 6).map((item) => {
                return (
                  <Link to={`/categories/${item.slug}`}>
                    <div className="category w-[300px] xl:h-full sm:h-[100px] bg-[#e1e0e0] hover:bg-[#ecebeb] rounded-[6px] pt-[10px] pl-[10px] cursor-pointer">
                      <h1 className="text-[19px]">{item.title}</h1>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>
                <h1>Загрузка...</h1>
              </div>
            )}
            {hospitals.length === 0 && loadingHospitals === false && (
              <div>
                <h1 className="text-[20px] font-[500] text-[#2e2e2e]">
                  Клиники не найдены
                </h1>
              </div>
            )}
            {categories.length === 0 && loadingCategories === false && (
              <div className="text-[20px] font-[500] text-[#2e2e2e]">
                <h1>Категории не найдены</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
