import { Link, Outlet} from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
    return (
      <div className="homepage container-fluid p-0">
        <div className="logo-img m-sm-auto"></div>
        <div className="row g-0">
          <div className="col-12 col-lg-7 big-block bg-primary d-flex align-items-center justify-content-center">
            <div className="text-white">
              <h1>Kind Quest - community help</h1>
              <p>Be a part of power of the community!</p>
              <div className={`row ${isAuthenticated() ? 'd-none' : ''}`}>
                <div className="col -6">
                <Link to="/signup" className="btn btn-secondary w-100">Sign Up</Link>
                </div>
                <div className="col-6">
                <Link to="/login" className="btn btn-secondary w-100">Login</Link>
                </div>
              </div>
              <div className={`row ${isAuthenticated() ? '' : 'd-none'}`}>
              <div className="col-10 mx-auto">
                <Link to="/dashboard" className="btn btn-secondary w-100">Go to Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 big-block bg-image">
          </div>
        </div>
        <div className="row d-flex align-items-center big-block bg-secondary" >
          <div className="col-lg-8 col-10 m-auto text-center text-white">
            <h1>Be the hero your neighborhood needs</h1>
            <p>This platform is your doorway to making a difference, where every act of kindness is a step towards a more compassionate world. Whether you're offering support or seeking it, you're never alone. With features designed to make volunteering seamless and meaningful, from direct messaging to real-time updates on unfulfilled requests, your goodwill finds its way exactly where it's needed. As you explore our homepage on</p>
          </div>
        </div>
        <Outlet /> 
      </div>
    );
  }
  