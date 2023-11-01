import { createContext, useEffect, useState } from "react";
import { postData } from "../api/postData";

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  //signup
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //enterprise signup
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [hourlyCharge, setHourlyCharge] = useState();
  const [services, setServices] = useState("");
  const [CAC, setCAC] = useState(null);
  const [uploadableCAC, setUploadableCAC] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploadablePhoto, setUploadablePhoto] = useState(null);

  //complete signup
  const [file, setFile] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [occupationValue, setOccupationValue] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState("");
  const [isEnterprise, setIsEnterprise] = useState(false);

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && reader.result) {
          setUploadablePhoto(reader.result);
        }
      };
      reader.readAsDataURL(photo);
    }
    console.log(photo);
  }, [photo]);

  useEffect(() => {
    if (CAC) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && reader.result) {
          setUploadableCAC(reader.result);
        }
      };
      reader.readAsDataURL(CAC);
    }
    console.log(CAC);
  }, [CAC]);

  const signup = (enterprise) =>
    postData(`/users/${enterprise ? "enterprise/" : ""}signup`, {
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phoneNumber,
      password,
      passwordConfirm,
      photo: uploadablePhoto,
      cac: uploadableCAC,
      file,
      DateOfBirth,
      occupation: occupationValue.occupation,
      state,
      city,
      aboutMe: bio,
      businessLocation,
      category: category.category,
      subcategory: category.subCategory,
      hourlyPay: Number(hourlyCharge),
    });
  return (
    <SignupContext.Provider
      children={children}
      value={{
        name,
        setName,
        username,
        setUsername,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        businessName,
        setBusinessName,
        businessCategory,
        setBusinessCategory,
        hourlyCharge,
        setHourlyCharge,
        services,
        setServices,
        CAC,
        setCAC,
        file,
        setFile,
        DateOfBirth,
        setDateOfBirth,
        occupationValue,
        setOccupationValue,
        state,
        setState,
        city,
        setCity,
        businessLocation,
        setBusinessLocation,
        bio,
        setBio,
        signup,
        isEnterprise,
        setIsEnterprise,
        photo,
        setPhoto,
        category,
        setCategory,
      }}
    />
  );
};
