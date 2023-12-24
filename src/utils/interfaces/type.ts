//---------------- OBJECT
export type ObjectStringType = {
  [key: string]: string;
};

export type ObjectAnyType = {
  [key: string]: any;
};

export type ObjectArrayType = {
  [key: string]: ArrayAnyType; // key is the name of object and value is array of objects.
};

export type ObjectObjectType = {
  [key: string]: ObjectAnyType | ObjectArrayType; // key is the name of object and value can be either an object or
};

// ----------------------- ARRAY
export type ArrayAnyType = Array<any>;
export type ArrayNumberTye = Array<number>;
export type ArrayStringType = Array<string>;
export type ArrayObjectType = Array<ObjectAnyType>;
export type ArrayArrayType = Array<ArrayAnyType>;

//-------------------- other
export type TestomonialObjecttype = {
  job: string;
  name: string;
  quote: string;
  img: string;
};

//--------------------------coursebycategorydata type
export type CourseType = {
  courseTitle: string;
  category: string;
  courseImageUrl: string;
  shortDescription: string;
  dateCreated: string;
  tutor: TutorType;

  // tutor information here if needed
};

export type CategoryType = {
  categoryDescription: string;
  categoryDetail: string;
  courses: CourseType[];
};

export type TutorType = {
  name: string;
  img: string;
};
