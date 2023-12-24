/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import SearchPagination from './SearchPagination';
import { SearchHero } from './SearchHero';
import SearchSection from './SearchSection';
import { NewsLetter } from '../../components/modules/home/NewsLetter';
const SearchResults = () => {
  return (
    <section className="bg-gray-200">
      {/* <SearchHero /> */}
      <SearchSection />
     
    </section>
  );
};

export default SearchResults;
