import React, { useEffect, useState } from "react";
import axios from "axios";

//For images
import imgHospital from "../../assets/hospital.jpg";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  //Pagination
  const [page, setPage] = useState(1)
  // const [linit, setLimit] = useState(10)

  async function getHospitals() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://hospitaltj.pythonanywhere.com/api/v1/hospitals/?search=${search}&page=${page}`
      );

      setHospitals(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHospitals();
  }, [search, page]);

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
                Клиники не найдены
              </h1>
            </div>
          ) : null}
        </section>
        <div className="for_pagination flex justify-center items-center mt-[30px]">
          <Pagination page={page} onChange={(_, newPage)=> setPage(newPage)} size="small" />
        </div>
      </div>
    </>
  );
};

export default Hospitals;
