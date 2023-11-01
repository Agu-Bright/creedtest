import React, {useEffect, useRef} from 'react'
import './Enterprise.css'
import Entpic from '../../assets/EnterprisePagepic/Rectangle-485man.png'
import Account from '../../assets/EnterprisePagepic/Account.png'
import Profile from '../../assets/EnterprisePagepic/profile.png'
import Document from '../../assets/EnterprisePagepic/documents.png'
import Project from '../../assets/EnterprisePagepic/project.png'
import EntImg from '../../assets/EnterprisePagepic/Rectangle-70.png'
import Footer from '../../components/Footer/Footer'
import Nav from '../../components/nav/Nav'
import BackToTop from 'react-easy-back-to-top'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Enterprise = () => {
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <>
            <Nav />
            <div className='pb-8 lg:pb-16 bg-[#455A64] relative border-l-0 border-t-0 border-r-0 border-b-2 border-solid border-b-yellow-500 overflow-hidden'>
                <div className="pt-9 lg:col-span-7 xl:bg-transparent lg:pl-16 lg:pt-5 xl:pl-16 relative" data-aos="zoom-out" data-aos-duration="800">
                    <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
                        <h1 class="font-display text-3xl xs:text-4xl font-extrabold text-gray-50 sm:text-6xl">A business project?
                            Get more done while spending <b>less.</b></h1>
                        <p class="mt-4 textlg xs:text-3xl text-gray-50">Make use of our workforce to help your company thrive.</p>
                        <div class="mt-8 flex gap-4 lg:mt-12 animate-bounce">
                            <Link class="inline-flex justify-center rounded-md py-2 px-6 text-base font-inter tracking-tight shadow-sm focus:outline-none bg-white border border-solid border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:bg-yellow-600 active:text-white/80 disabled:opacity-30 disabled:hover:bg-yellow-600 lg:text-lg duration-150 cursor-pointer" to="/contact-us">create enterprise account</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='Enterprise'>
                <div className="enterprise-content"  data-aos="zoom-out" data-aos-duration="800">
                    <div className="enterprise-title">
                        <span>
                            A business project?
                            Get more done while spending <b>less.</b>
                        </span>
                    </div>
                    <div className="enterprise-para">
                        <span>
                            Make use of our workforce to help your company thrive.
                        </span>
                    </div>
                    <div className="enterprise-btn_display">
                        <a href="/" className='enterprise-btn'>Contact us</a>
                    </div>
                </div>
            </div> */}
            <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12 lg:py-12 text-lg tracking-tight text-slate-700" data-aos="flip-down">
                <p className="font-display text-4xl font-bold tracking-tight text-primary-500" data-aos="zoom-out" data-aos-duration="800">How does our Enterprise suite help your business?</p>
                <p className="mt-4 font-inter">
                    Here at Creedlance, we believe that the right team for your task can be
                    easily affordable, given the right networking skills. 
                    With A valid CAC certificate of your registered business and any method of identification, you can open an enterprise account on creedlance which gives you access to
                </p>
                {/* <p className="mt-4">
                    Registering as an enterprise in Creedlance gives you access to proffessional creedlancers for every Job, more affordable Trust worthy creedlancers, get acess to the top 10% of creedlance clients and the opportunity to work for them, a custom page for displaying products or services, advantage over the regular creedlancers, while in a bid for jobsget jobs/contracts/projects come to you, rather than search for them
                </p> */}
                <ul role="list" className="mt-8 space-y-3">
                    <li className="flex" data-aos="flip-down" data-aos-duration="800">
                        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 flex-none fill-primary-500">
                            <path d="M11.83 15.795a1 1 0 0 0-1.66 1.114l1.66-1.114Zm9.861-4.072a1 1 0 1 0-1.382-1.446l1.382 1.446ZM14.115 21l-.83.557a1 1 0 0 0 1.784-.258L14.115 21Zm.954.3c1.29-4.11 3.539-6.63 6.622-9.577l-1.382-1.446c-3.152 3.013-5.704 5.82-7.148 10.424l1.908.598Zm-4.9-4.391 3.115 4.648 1.661-1.114-3.114-4.648-1.662 1.114Z">
                            </path>
                        </svg>
                        <span className="ml-4">Proffessional creedlancers for every Job</span>
                    </li>
                    <li className="flex" data-aos="flip-up" data-aos-duration="800">
                        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 flex-none fill-primary-500">
                            <path d="M11.83 15.795a1 1 0 0 0-1.66 1.114l1.66-1.114Zm9.861-4.072a1 1 0 1 0-1.382-1.446l1.382 1.446ZM14.115 21l-.83.557a1 1 0 0 0 1.784-.258L14.115 21Zm.954.3c1.29-4.11 3.539-6.63 6.622-9.577l-1.382-1.446c-3.152 3.013-5.704 5.82-7.148 10.424l1.908.598Zm-4.9-4.391 3.115 4.648 1.661-1.114-3.114-4.648-1.662 1.114Z">
                            </path>
                        </svg>
                        <span className="ml-4">More affordable Trust worthy creedlancers</span>
                    </li>
                    <li className="flex" data-aos="flip-down" data-aos-duration="800">
                        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 flex-none fill-primary-500">
                            <path d="M11.83 15.795a1 1 0 0 0-1.66 1.114l1.66-1.114Zm9.861-4.072a1 1 0 1 0-1.382-1.446l1.382 1.446ZM14.115 21l-.83.557a1 1 0 0 0 1.784-.258L14.115 21Zm.954.3c1.29-4.11 3.539-6.63 6.622-9.577l-1.382-1.446c-3.152 3.013-5.704 5.82-7.148 10.424l1.908.598Zm-4.9-4.391 3.115 4.648 1.661-1.114-3.114-4.648-1.662 1.114Z">
                            </path>
                        </svg>
                        <span className="ml-4">Get acess to the top 10% of creedlance clients and the opportunity to work for them</span>
                    </li>
                    <li className="flex" data-aos="flip-up" data-aos-duration="800">
                        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 flex-none fill-primary-500">
                            <path d="M11.83 15.795a1 1 0 0 0-1.66 1.114l1.66-1.114Zm9.861-4.072a1 1 0 1 0-1.382-1.446l1.382 1.446ZM14.115 21l-.83.557a1 1 0 0 0 1.784-.258L14.115 21Zm.954.3c1.29-4.11 3.539-6.63 6.622-9.577l-1.382-1.446c-3.152 3.013-5.704 5.82-7.148 10.424l1.908.598Zm-4.9-4.391 3.115 4.648 1.661-1.114-3.114-4.648-1.662 1.114Z">
                            </path>
                        </svg>
                        <span className="ml-4">A custom page for displaying products or services</span>
                    </li>
                    <li className="flex" data-aos="flip-down" data-aos-duration="800">
                        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 flex-none fill-primary-500">
                            <path d="M11.83 15.795a1 1 0 0 0-1.66 1.114l1.66-1.114Zm9.861-4.072a1 1 0 1 0-1.382-1.446l1.382 1.446ZM14.115 21l-.83.557a1 1 0 0 0 1.784-.258L14.115 21Zm.954.3c1.29-4.11 3.539-6.63 6.622-9.577l-1.382-1.446c-3.152 3.013-5.704 5.82-7.148 10.424l1.908.598Zm-4.9-4.391 3.115 4.648 1.661-1.114-3.114-4.648-1.662 1.114Z">
                            </path>
                        </svg>
                        <span className="ml-4">Advantage over the regular creedlancers, while in a bid for jobsget jobs/contracts/projects come to you, rather than search for them</span>
                    </li>
                </ul>
            </div>
            {/* <div className="Enterprise_suite">
                <div className="Enterprise_suite-container">
                    <div className="Enterprise_suite-title">
                        <span>How does our Enterprise suite help your business?</span>
                    </div>
                    <div className="Enterprise_suite-sub">
                        <span>Here at Creedlance, we beleive that the right team for your task can be <br />easily affordable, given the right networking skills.
                        </span>
                    </div>
                    <div className="Enterprise_suite-content">
                        <div className="Enprise_suite-content--part1">


                            <div className="Enterprise_suite-content-first">
                                <div className='Enterprise_suite-content-first-title'>
                                    <span>Requirement for an enterprise account:</span>
                                </div>
                                <div className="Enterprise_suite-content-first-para">
                                    <span>  A valid CAC certificate of your registered business.
                                        Any method of identification.</span>
                                </div>
                            </div>
                            <div className="Enterprise_suite-content-second">
                                <div className="Enterprise_suite-content-second-title">
                                    <span>Registering as an enterprise in Creedlance gives you acess to:
                                    </span>
                                </div>
                                <div className="Enterprise_suite-content-second-para">
                                    <span>Proffessional creedlancers for every Job. More affordable Trust worthy creedlancers. get acess to
                                        the top 10% of creedlance clients and the opportunity to work for them.
                                        A custom page for displaying products or services. advantage over the regular creedlancers,
                                        while in a bid for jobsget jobs/contracts/projects come to you, rather than search for them</span>
                                </div>
                            </div>
                        </div>
                        <div className="Enterprise_suite-content-image">
                            <img src={Entpic} alt="entpic" />
                        </div>

                    </div>
                </div>
            </div> */}
            <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12">
                <p className="font-display text-4xl font-bold tracking-tight text-primary-500" data-aos="slide-right" data-aos-duration="400">We’ll show you how, step by step</p>
                <p className="mt-4 font-inter">
                    Enterprise customers benefit from dedicated support from high performers and a strong platform.
                </p>

                {/* step one */}
                <div data-aos="flip-up" data-aos-duration="600">
                    <h2 className="inline-flex items-center rounded-full px-4 py-1 text-primary-500 border-[1px] border-solid border-yellow-400">
                        <span className="font-mono text-sm" aria-hidden="true">01</span><span className="ml-3 h-3.5 w-px bg-primary-500"></span><span className="ml-3 text-base font-medium tracking-tight">Step One</span>
                    </h2>
                    <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">Create An Account</p>
                    <p className="mt-4 text-lg tracking-tight text-slate-700">Navigate to signup link on the menu bar. once in, click on sign up as an enterprise where you will provide essential details needed for your enterprise account creation</p>
                </div>
                
                {/* step two */}
                <div data-aos="flip-up" data-aos-duration="600">
                    <h2 className="inline-flex items-center rounded-full px-4 py-1 text-primary-500 border-[1px] border-solid border-yellow-400">
                        <span className="font-mono text-sm" aria-hidden="true">02</span><span className="ml-3 h-3.5 w-px bg-primary-500"></span><span className="ml-3 text-base font-medium tracking-tight">Step Two</span>
                    </h2>
                    <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">Upload Documents</p>
                    <p className="mt-4 text-lg tracking-tight text-slate-700">After your account has been successfully created you will be prompted to provide your documents account creation</p>
                </div>

                {/* step three */}
                <div data-aos="flip-up" data-aos-duration="600">
                    <h2 className="inline-flex items-center rounded-full px-4 py-1 text-primary-500 border-[1px] border-solid border-yellow-400">
                        <span className="font-mono text-sm" aria-hidden="true">03</span><span className="ml-3 h-3.5 w-px bg-primary-500"></span><span className="ml-3 text-base font-medium tracking-tight">Step Three</span>
                    </h2>
                    <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">Complete your profile</p>
                    <p className="mt-4 text-lg tracking-tight text-slate-700">A completed profile has a better chance of locating and being allocated with jobs. account creation</p>
                </div>

                {/* step four */}
                <div data-aos="flip-up" data-aos-duration="600">
                    <h2 className="inline-flex items-center rounded-full px-4 py-1 text-primary-500 border-[1px] border-solid border-yellow-400">
                        <span className="font-mono text-sm" aria-hidden="true">04</span><span className="ml-3 h-3.5 w-px bg-primary-500"></span><span className="ml-3 text-base font-medium tracking-tight">Step Four</span>
                    </h2>
                    <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">Start engaging in project bids</p>
                    <p className="mt-4 text-lg tracking-tight text-slate-700">With every project of job you complete you have a better chance at getting another. account creation</p>
                </div>
            </div>
            {/* <div className="Enterprise-step">
                <div className="Enterprise-step_content">
                    <div className="Enterprise-step_content-title">
                        <span>We’ll show you how, step by step</span>
                    </div>
                    <div className="Enterprise-step_content-para">
                        <span>Enterprise customers benefit from dedicated support from high performers and a strong platform.</span>
                    </div>
                    <div className="Enterprise_mainContent">
                        <div className="Enterprise_mainContent-container">
                            <div className="Enterprise1">
                                <div className='Enterprise-step_icon'>
                                    <img src={Account} alt="" />
                                </div>
                                <div className="Enteprise-step_title">
                                    <span>Create Account</span>
                                </div>
                                <div className="Enterprise-step_sub">
                                    <span>Navigate to signup link on the menu bar.
                                        once in, click on sign up as an enterprise
                                        where you will provide essential
                                        details needed for your enterprise
                                        account creation</span>
                                </div>
                            </div>

                            <div className="Enterprise1">
                                <div className='Enterprise-step_icon'>
                                    <img src={Document} alt="" />
                                </div>
                                <div className="Enteprise-step_title">
                                    <span>Upload Documents</span>
                                </div>
                                <div className="Enterprise-step_sub">
                                    <span>After your account has been
                                        successfully created you will be
                                        prompted to provide your documents
                                        account creation</span>
                                </div>
                            </div>
                            <div className="Enterprise1">
                                <div className='Enterprise-step_icon'>
                                    <img src={Profile} alt="" />
                                </div>
                                <div className="Enteprise-step_title">
                                    <span>Complete your profile</span>
                                </div>
                                <div className="Enterprise-step_sub">
                                    <span>A completed profile has a
                                        better chance of locating and
                                        being allocated with jobs.

                                        account creation</span>
                                </div>
                            </div>

                            <div className="Enterprise1">
                                <div className='Enterprise-step_icon'>
                                    <img src={Project} alt="" />
                                </div>
                                <div className="Enteprise-step_title">
                                    <span>Start engaging in project bids</span>
                                </div>
                                <div className="Enterprise-step_sub">
                                    <span>With every project of job you
                                        complete you have a better
                                        chance at getting another.

                                        account creation</span>
                                </div>
                            </div>
                        </div>
                        <div className="enterprise-btn_display ">
                            <a href="/" className='enterprise-step-btn get'>Get Started</a>
                        </div>
                    </div>
                </div>


            </div> */}
            <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12 lg:py-12 text-lg tracking-tight text-slate-700 mb-16 lg:mb-32">
                <p className="font-display text-4xl font-bold tracking-tight text-primary-500 mb-10" data-aos="zoom-in">Learn how Enterprise Suite can help you grow your business</p> 
                <Link to="/" className='bg-transparent text-yellow-500 font-inter border border-dashed border-yellow-500 py-2 px-4 rounded-md' data-aos="zoom-in" data-aos-duration="800">Talk to an Expert</Link>
            </div>
            <BackToTop
                backgroundColor="goldenrod"
                icon='fa fa-arrow-up'
                position={{ right: "5%", bottom: "10%" }}
                hover={{ backgroundColor: "#fff", color: "goldenrod" }}
                transition="all 0.3s"
                showOnDistance={300}
                borderRadius={16}
                opacity="1"
                color="#fff"
                fontSize={window.innerWidth < 768 ? "14px" : "18px"}
                padding={window.innerWidth < 768 ? "12px" : "16px"}
            />
            <Footer />
        </>
    )
}

export default Enterprise