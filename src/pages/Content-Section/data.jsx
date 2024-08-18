import BusinessRelationship from "@/assets/Images/Content-Section/BusinessRelationship";
import ContentWriting from "@/assets/Images/Content-Section/ContentWriting";
import CustomersService from "@/assets/Images/Content-Section/CustomersService";
import ECommerce from "@/assets/Images/Content-Section/E-Commerce";
import Education from "@/assets/Images/Content-Section/Education";
import Marketers from "@/assets/Images/Content-Section/Marketers";
import Sales from "@/assets/Images/Content-Section/Sales";
import Seo from "@/assets/Images/Content-Section/Seo";
import SocialMedia from "@/assets/Images/Content-Section/SocialMedia";
import VideoImage from "@/assets/Images/Content-Section/Video";
import Cv from "@/assets/Images/Content-Section/Cv";

export const cards = [
  {
    title: "الأنشطة التجارية",
    description: "محتوى تحليلي لاتخاذ القرارات الاستراتيجية",
    image: <BusinessRelationship />,
    slug: "business-relationship",
  },
  {
    title: "المسوقين",
    description: "أدوات تسويقية لجذب الجمهور المستهدف",
    image: <Marketers />,
    slug: "marketers",
  },
  {
    title: "وسائل التواصل الاجتماعي",
    description: "محتوى اجتماعي لزيادة التفاعل مع الجمهور",
    image: <SocialMedia />,
    slug: "social-media",
  },
  {
    title: "تحسين محركات البحث",
    description: "محتوى مهيكل لتحسين نتائج محركات البحث",
    image: <Seo />,
    slug: "seo",
  },
  {
    title: "كتابة المحتوى",
    description: "محتوى متميز مبني على البيانات والتحليل",
    image: <ContentWriting />,
    slug: "content-writing",
  },
  {
    title: "الفيديوهات",
    description: "محتوى فيديوهات مبتكر لجذب الانتباه",
    image: <VideoImage />,
    slug: "video",
  },
  {
    title: "المبيعات",
    description: "محتوى ترويجي لزيادة مبيعات المنتجات والخدمات",
    image: <Sales />,
    slug: "sales",
  },
  {
    title: "خدمة العملاء",
    description: "المساعدة في تقديم الدعم وحل المشاكل بشكل فعّال",
    image: <CustomersService />,
    slug: "customers-service",
  },
  {
    title: "التجارة الإلكترونية",
    description: " تحسين تجربة التسوق الفعال عبر الإنترنت",
    image: <ECommerce />,
    slug: "e-commerce",
  },
  {
    title: "التعليم والمعلمين",
    description: " محتوى تعليمي متنوع لتسهيل التعلم وتحفيز الطلاب",
    image: <Education />,
    slug: "education",
  },
  {
    title: "السيرة الذاتية",
    description: " مساعدة في إنشاء سير ذاتية متميزة",
    image: <Cv />,
    slug: "cv",
  },
];
