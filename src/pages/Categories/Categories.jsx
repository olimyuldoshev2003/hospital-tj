import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const Categories = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  //Pagination
  const [page, setPage] = useState(1)

  async function getCategories() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        // search === ""
        // ?
        `https://hospitaltj.pythonanywhere.com/api/v1/categories/?search=${search}`
        // :
        // `https://myhospitalproject.pythonanywhere.com/api/v1/categories/?search=${search}&?page=${page}`
      );

      setCategories(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  //For pagination
  // async function getCategoriesCount() {
  //   try {
  //     const { data } = await axios.get(
  //       "https://myhospitalproject.pythonanywhere.com/api/v1/categories/"
  //     );
  //     setCategoriesCount(Math.ceil(data.results.length / limit));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    getCategories();
    // getCategoriesCount();
  }, [search]);

  return (
    <>
      <div className="page_categories mt-20">
        <section className="section_1 flex justify-center items-center flex-wrap h-[250px] gap-20">
          <h1 className="sm:text-[36px] md:text-[50px] font-[400]">
            Категории
          </h1>
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
        <div className="categories grid xl:grid-cols-[300px_300px_300px_300px] lg:grid-cols-[300px_300px_300px] md:grid-cols-[300px_300px] sm:grid-cols-[300px] justify-items-center place-content-center gap-3 max-w-[1440px] m-[0_auto]">
          {loading === false ? (
            categories.map((item) => {
              return (
                <Link to={`/categories/${item.slug}`}>
                  <div className="category w-[300px] h-[100px] bg-[#e1e0e0] hover:bg-[#ecebeb] rounded-[6px] pt-[10px] pl-[10px] cursor-pointer">
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

          {categories.length === 0 && loading === false ? (
            <div>
              <h1 className="text-[20px] font-[500] text-[#2e2e2e]">
                Категории не найдены
              </h1>
            </div>
          ) : null}
        </div>
        <div className="for_pagination flex justify-center items-center mt-[30px]">
          <Pagination size="small" page={page} onChange={(_, newPage) => setPage(newPage)}/>
        </div>
      </div>
    </>
  );
};

export default Categories;
