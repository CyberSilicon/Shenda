import React from "react";

const Users = ({ geousers }) => {
  return (
    <div>
      {console.log(geousers)}
      <div>
        <h1>All users</h1>
        {geousers.map((geouser) => (
          <div key={geouser.id}>
            <a>
              <h2>{geouser.name}</h2>
            </a>
            <div className="bg-green-500">
              <h1>{geouser.email}</h1>
              <h1>{geouser.website}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: {
      geousers: data,
    },
  };
}
