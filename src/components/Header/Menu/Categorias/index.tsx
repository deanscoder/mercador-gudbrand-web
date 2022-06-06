import React from 'react';
import * as css from './styles'
import labels from './config';
import { AiOutlineShopping } from 'react-icons/ai';
import Link from 'next/link'

const Categories = () => {
  //console.log(labels);
  return (
    <css.CategoryContainer>
    <css.CategoryList>
    <CategoriesItems />
    </css.CategoryList>
    </css.CategoryContainer>
    );
  }
  
  export default Categories;
  
  const CategoriesItems = () => {
    return <>{
      labels.map(item => {
        if(item.has_child){
          return (
            <css.CategoryItem key={item.name}>
            <css.CategoryFather>
            <a href={item.href}>{item.name}</a>
            <AiOutlineShopping />
            </css.CategoryFather>
            <css.CategoryBox>
            <css.BrandsPlaceholder id='BrandPlaceholder'>
            <css.CategoryBoxTitle>{item.name}</css.CategoryBoxTitle>
            {item.has_child && item.child.map(child => 
              <article key={child.name}>
              <css.Departament>
              <css.DepartamentHeader>
              {child.name}
              </css.DepartamentHeader>
              <css.DepartamentContentList>
              {child.links.map(link => 
                <css.DepartamentContentItem key={link.name}>
                  <Link href={link.href}>
                    <a>{link.name}</a>
                  </Link>
                </css.DepartamentContentItem>
                )}
                </css.DepartamentContentList>
                </css.Departament>
                </article>
                )}
                </css.BrandsPlaceholder>
                </css.CategoryBox>
                </css.CategoryItem>);
              } else {
                return (
                  <css.CategoryItem key={item.name}>
                    <Link href={item.href}>
                      <a>{item.name}</a>
                    </Link>
                  </css.CategoryItem>
                  );
                }
              })}</>
              ;
            }