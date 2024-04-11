import React, { useEffect, useState } from "react";
import axios from "axios";

//For images
import imgHospital from "../../assets/hospital.jpg";
import { Link } from "react-router-dom";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function getHospitals() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/hospitals/?search=${search}`
      );

      setHospitals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHospitals();
  }, [search]);

  return (
    <>
      <div className="hospitals">
        <section className="section_1 flex justify-center items-center flex-wrap h-[250px] md:gap-20 sm:gap-2 max-w-[1440px] m-[0_auto]">
          <h1 className="sm:text-[36px] md:text-[50px] font-[400]">Клиники</h1>
          <input
            type="search"
            name=""
            id=""
            className="outline-none p-[7px_10px] border-[2px] border-[#dcdada] rounded-[12px] placeholder:text-[#737272] w-[300px]"
            placeholder="Поиск"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>
        <section className="section_2 px-[10px] sm:justify-center flex md:justify-start flex-wrap gap-2 max-w-[1440px] m-[0_auto]">
          {loading === false ? (
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

          {hospitals.length === 0 && loading === false ? (
            <div>
              <h1 className="text-[20px] font-[500] text-[#2e2e2e]">
                В этой категории нет никаких клиники
              </h1>
            </div>
          ) : null}
          {/* <div
            className="hospitals relative w-[max-content]
          cursor-pointer"
          >
            <img
              src={imgHospital}
              className="w-[300px] rounded-[10px]"
              alt=""
            />
            <h1 className="absolute top-[15px] text-[#fff] left-[17px] text-[22px] font-[500]">
              Hospitals
            </h1>
            <p className="absolute top-[50px] text-[#fff] left-[17px] text-[14px] font-[500] ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident reprehenderit, quidem hic optio assumenda nobis. Saepe
              neque mollitia necessitatibus ex voluptas consequatur a? Sed
              cupiditate ad ullam dolorem rem obcaecati?
            </p>
          </div>
          <div
            className="hospitals relative w-[max-content]
          cursor-pointer"
          >
            <img
              src={imgHospital}
              className="w-[300px] rounded-[10px]"
              alt=""
            />
            <h1 className="absolute top-[15px] text-[#fff] left-[17px] text-[22px] font-[500]">
              Hospitals
            </h1>
            <p className="absolute top-[50px] text-[#fff] left-[17px] text-[14px] font-[500] ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident reprehenderit, quidem hic optio assumenda nobis. Saepe
              neque mollitia necessitatibus ex voluptas consequatur a? Sed
              cupiditate ad ullam dolorem rem obcaecati?
            </p>
          </div>
          <div
            className="hospitals relative w-[max-content]
          cursor-pointer"
          >
            <img
              src={imgHospital}
              className="w-[300px] rounded-[10px]"
              alt=""
            />
            <h1 className="absolute top-[15px] text-[#fff] left-[17px] text-[22px] font-[500]">
              Hospitals
            </h1>
            <p className="absolute top-[50px] text-[#fff] left-[17px] text-[14px] font-[500] ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident reprehenderit, quidem hic optio assumenda nobis. Saepe
              neque mollitia necessitatibus ex voluptas consequatur a? Sed
              cupiditate ad ullam dolorem rem obcaecati?
            </p>
          </div>
          <div
            className="hospitals relative w-[max-content]
          cursor-pointer"
          >
            <img
              src={imgHospital}
              className="w-[300px] rounded-[10px]"
              alt=""
            />
            <h1 className="absolute top-[15px] text-[#fff] left-[17px] text-[22px] font-[500]">
              Hospitals
            </h1>
            <p className="absolute top-[50px] text-[#fff] left-[17px] text-[14px] font-[500] ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident reprehenderit, quidem hic optio assumenda nobis. Saepe
              neque mollitia necessitatibus ex voluptas consequatur a? Sed
              cupiditate ad ullam dolorem rem obcaecati?
            </p>
          </div>
          <div
            className="hospitals relative w-[max-content]
          cursor-pointer"
          >
            <img
              src={imgHospital}
              className="w-[300px] rounded-[10px]"
              alt=""
            />
            <h1 className="absolute top-[15px] text-[#fff] left-[17px] text-[22px] font-[500]">
              Hospitals
            </h1>
            <p className="absolute top-[50px] text-[#fff] left-[17px] text-[14px] font-[500] ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident reprehenderit, quidem hic optio assumenda nobis. Saepe
              neque mollitia necessitatibus ex voluptas consequatur a? Sed
              cupiditate ad ullam dolorem rem obcaecati?
            </p>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default Hospitals;
