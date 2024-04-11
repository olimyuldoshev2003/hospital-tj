import axios from "axios";
import React, { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");
  const [inpFrom, setInpFrom] = useState("");
  const [inpTo, setInpTo] = useState("");

  console.log(inpFrom);
  console.log(inpTo);

  async function getServices() {
    setLoading(true)
    try {
      const { data } = await axios.get(
        inpFrom === "" || inpTo === ""
          ? `https://hospitaltj.pythonanywhere.com/api/v1/services/?max_price=${inpTo}&min_price=${inpFrom}`
          : `https://hospitaltj.pythonanywhere.com/api/v1/services/?search=${search}&max_price=${inpTo}&min_price=${inpFrom}`
      );
      setServices(data);
    } catch (error) { }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getServices();
  }, [search,inpFrom, inpTo]);

  return (
    <>
      <div className="page_services">
        <div className="for_h1 mt-[30px] flex justify-center gap-5 flex-wrap items-center">
          <h1 className="text-center text-[20px] font-[500]">Все сервисы</h1>
          <input
            type="search"
            name=""
            id=""
            className="outline-none p-[7px_10px] border-[2px] border-[#dcdada] rounded-[12px] placeholder:text-[#737272] w-[300px]"
            placeholder="Поиск"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="for_h1_filter mt-[20px]">
          <h1 className="text-center text-[20px] font-[500]">
            Филтровать с цену
          </h1>
        </div>
        <div className="for_filter_by_price flex justify-center mt-[20px] gap-3">
          <input
            type="number"
            name=""
            id=""
            className="outline-none p-[7px_10px] border-[2px] border-[#dcdada] rounded-[12px] placeholder:text-[#737272] w-[100px]"
            placeholder="От"
            value={inpFrom}
            onChange={(event) => setInpFrom(event.target.value)}
          />
          <input
            type="number"
            name=""
            id=""
            className="outline-none p-[7px_10px] border-[2px] border-[#dcdada] rounded-[12px] placeholder:text-[#737272] w-[100px]"
            placeholder="До"
            value={inpTo}
            onChange={(event) => setInpTo(event.target.value)}
          />
        </div>

        <div
          className={`services ${
            services.length ? `bg-[#edecec]` : `bg-transparent`
          } mt-[30px] max-w-[1440px] m-[0_auto] p-[10px] rounded-[20px] px-[20px] flex flex-col gap-2`}
        >
          {loading === false ? (
            services
              
           
              .map((item) => {
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
              <h1>Загрузка...</h1>
            </div>
          )}
          {services.length === 0 && loading === false ? (
            <div>
              <h1 className="text-[20px] font-[500] text-[#2e2e2e]">
                В этой клинике нет никаких услуг
              </h1>
            </div>
          ) : null}
          {
            inpFrom === "" || inpTo === "" ?
              <div>
              <h1 className="text-[20px] font-[500] text-[#2e2e2e]">
                Пожалуйста наполните цену филтрацию об какую цену до какую цену
              </h1>
            </div> : null
          }
        </div>
      </div>
    </>
  );
};

export default Services;
