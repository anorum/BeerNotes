import React from "react";
import PropTypes from "prop-types";

const BeerIcons = props => {
  const { icon } = props;
  let beericon = null;
  switch (icon) {
    case "belgian":
      beericon = (
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 297 297"
          style={props.style}
          xmlSpace="preserve"
        >
          <path
            d="M257.702,55.307c0-26.403-21.48-47.884-47.882-47.884c-10.124,0-19.747,3.197-27.682,8.821
    c-6.55-3.213-13.837-4.949-21.374-4.949c-2.486,0-4.972,0.194-7.426,0.575C143.551,4.289,131.377,0,118.808,0
    c-12.459,0-24.269,3.994-34.149,11.55c-5.977,4.57-10.985,10.339-14.708,16.841c-17.785,5.888-30.652,22.672-30.652,42.406
    c0,16.066,8.53,30.174,21.297,38.043c-4.778,15.742-7.683,33.24-7.683,46.84c0,25.083,9.994,47.785,28.142,63.925
    c15.04,13.374,34.791,21.528,56.412,23.463v33.804h-28.984c-5.558,0-10.064,4.507-10.064,10.064c0,5.559,4.507,10.065,10.064,10.065
    h78.1c5.558,0,10.064-4.506,10.064-10.065c0-5.558-4.507-10.064-10.064-10.064h-28.987v-33.804
    c21.623-1.935,41.375-10.088,56.416-23.463c18.148-16.14,28.144-38.842,28.144-63.925c0-17.074-4.396-39.294-11.275-57.38
    C246.75,90.493,257.702,74.158,257.702,55.307z M147.53,223.398c-40.61,0-70.736-25.216-74.157-60.88h148.319
    C218.273,198.182,188.145,223.398,147.53,223.398z M211.253,103.35c4.719,11.755,8.295,26.172,9.875,39.04H73.927
    c1.07-8.729,3.067-18.209,5.753-27.143c1.407,0.135,2.833,0.209,4.275,0.209c7.166,0,14.062-1.672,20.255-4.833
    c4.746,1.273,9.66,1.929,14.598,1.929c9.398,0,18.495-2.316,26.595-6.671c4.9,1.634,10.064,2.473,15.362,2.473
    c10.68,0,20.772-3.48,28.971-9.578c6.207,2.869,13.043,4.416,20.085,4.416c0.458,0,0.911-0.021,1.366-0.035
    C211.211,103.221,211.227,103.286,211.253,103.35z M209.82,83.063c-9.524,0-17.923-4.798-22.925-12.105
    c-4.328,10.153-14.396,17.269-26.131,17.269c-6.421,0-12.338-2.132-17.098-5.722c-6.478,6.144-15.225,9.921-24.859,9.921
    c-6.292,0-12.205-1.614-17.36-4.442c-4.45,4.531-10.643,7.347-17.492,7.347c-13.55,0-24.529-10.983-24.529-24.532
    c0-13.547,10.979-24.527,24.529-24.527c0.04,0,0.079,0.002,0.118,0.002c4.342-15.096,18.244-26.144,34.734-26.144
    c11.828,0,22.329,5.684,28.925,14.466c3.902-2.021,8.333-3.172,13.032-3.172c9.875,0,18.569,5.045,23.659,12.691
    c4.304-9.752,14.051-16.563,25.396-16.563c15.327,0,27.754,12.427,27.754,27.757C237.574,70.635,225.148,83.063,209.82,83.063z"
          />
        </svg>
      );
      break;

    case "german":
      beericon = (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 463 463"
          style={props.style}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <path
                  d="M335.055,47.472C335.04,30.116,320.916,16,303.556,16c-0.981,0-1.976,0.054-2.992,0.164
                       C294.797,10.932,287.351,8,279.556,8c-3.237,0-6.412,0.51-9.494,1.521C264.197,3.473,256.153,0,247.556,0
                       c-5.647,0-11.161,1.552-16,4.446c-4.84-2.894-10.353-4.446-16-4.446c-8.598,0-16.642,3.473-22.506,9.521
                       C189.968,8.51,186.793,8,183.556,8c-7.795,0-15.242,2.932-21.008,8.164c-1.017-0.11-2.011-0.164-2.992-0.164
                       c-17.109,0-31.065,13.713-31.48,30.723c-0.728,4.147-4.716,28.669-4.125,64.879c0.586,35.907,6.033,90.504,28.647,146.698
                       c13.761,34.195,21.275,65.174,22.971,94.708c1.502,26.153-1.415,51.679-9.18,80.33c-1.948,7.186-0.487,14.677,4.007,20.551
                       c4.43,5.791,11.158,9.111,18.459,9.111h85.29c7.301,0,14.029-3.32,18.459-9.111c4.494-5.874,5.955-13.365,4.007-20.551
                       c-7.765-28.651-10.682-54.177-9.18-80.33c1.696-29.534,9.21-60.513,22.971-94.708c22.615-56.194,28.061-110.792,28.647-146.698
                       C339.614,77.154,336.032,53.285,335.055,47.472z M159.556,31c1.159,0,2.387,0.166,3.864,0.523
                       c2.777,0.67,5.697-0.296,7.526-2.494c3.188-3.832,7.784-6.029,12.61-6.029c2.748,0,5.46,0.749,8.063,2.224
                       c3.479,1.973,7.892,0.868,10.034-2.508c3.063-4.832,8.26-7.716,13.903-7.716c4.002,0,7.901,1.527,10.98,4.301
                       c2.853,2.57,7.187,2.57,10.039,0c3.079-2.773,6.979-4.301,10.98-4.301c5.643,0,10.84,2.884,13.903,7.716
                       c2.141,3.378,6.556,4.482,10.034,2.508c2.603-1.476,5.316-2.224,8.063-2.224c4.826,0,9.422,2.197,12.61,6.029
                       c1.828,2.198,4.745,3.166,7.526,2.494c1.478-0.357,2.706-0.523,3.864-0.523c6.396,0,11.942,3.666,14.679,9h-46.677
                       c-4.142,0-7.5,3.358-7.5,7.5l-0.001,48c0,4.687-3.813,8.5-8.5,8.5c-4.687,0-8.5-3.813-8.5-8.5l-0.003-47.465
                       c-0.003-5.896-4.487-8.035-7.5-8.035h-31.997c-4.142,0-7.5,3.358-7.5,7.5v96c0,4.687-3.813,8.5-8.5,8.5s-8.5-3.813-8.5-8.5v-96
                       c0-4.142-3.358-7.5-7.5-7.5h-30.678C147.614,34.666,153.159,31,159.556,31z M142.002,55h26.053v81h-27.902
                       C137.305,97.322,140.346,67.338,142.002,55z M296.489,252.7c-26.963,66.999-31.256,122.195-14.354,184.562
                       c0.715,2.64,0.189,5.379-1.443,7.513c-0.921,1.205-2.997,3.226-6.545,3.226h-85.29c-3.548,0-5.624-2.021-6.545-3.226
                       c-1.633-2.134-2.159-4.873-1.443-7.513c16.902-62.367,12.609-117.563-14.354-184.562c-14.346-35.649-21.619-70.844-24.987-101.7
                       h27.764c3.138,9.29,11.93,16,22.266,16s19.128-6.71,22.266-16h107.677C318.129,181.833,310.849,217.017,296.489,252.7z
                        M322.877,136H215.056V55h16.999c0.001,10.348,0.001,29.056,0.001,40.5c0,12.958,10.542,23.5,23.5,23.5
                       c12.958,0,23.5-10.542,23.5-23.5l0.001-40.5h41.948C322.671,67.33,325.731,97.301,322.877,136z"
                />
                <path
                  d="M255.556,416h-48c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h48c4.142,0,7.5-3.358,7.5-7.5
                       C263.056,419.358,259.698,416,255.556,416z"
                />
                <path
                  d="M253.013,310.812c0.556,0.125,1.111,0.186,1.658,0.186c3.428,0,6.522-2.366,7.309-5.85
                       c4.232-18.749,10.362-37.98,18.738-58.795c2.687-6.678,5.206-13.578,7.487-20.508c1.295-3.935-0.845-8.174-4.779-9.469
                       c-3.936-1.295-8.174,0.845-9.469,4.779c-2.18,6.625-4.587,13.218-7.154,19.598c-8.68,21.567-15.043,41.551-19.455,61.092
                       C246.436,305.885,248.972,309.9,253.013,310.812z"
                />
                <path
                  d="M288.278,198.813c0.56,0.127,1.119,0.188,1.669,0.188c3.424,0,6.516-2.36,7.307-5.839
                       c1.218-5.359,2.338-10.851,3.331-16.324c0.739-4.077-1.965-7.98-6.041-8.719c-4.074-0.745-7.979,1.965-8.718,6.041
                       c-0.954,5.257-2.03,10.532-3.199,15.677C281.709,193.877,284.239,197.895,288.278,198.813z"
                />
              </g>
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      );
      break;
    case "goblet":
      beericon = (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512.001 512.001"
          style={props.style}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path
                d="M413.495,265.174c-25.714-112.697-43.031-190.996-44.117-199.477c-1.58-12.333,0.997-25.04,7.256-35.783
			c3.585-6.155,3.608-13.755,0.06-19.93C373.145,3.807,366.566,0,359.443,0H152.551c-7.124,0-13.706,3.81-17.253,9.988
			c-3.548,6.177-3.523,13.782,0.068,19.935c6.261,10.731,8.845,23.438,7.275,35.78c-1.082,8.52-18.405,86.809-44.131,199.453
			c-6.27,27.45,0.007,55.998,17.22,78.317c16.875,21.883,42.26,34.943,69.659,35.833c1.061,0.033,2.126,0.052,3.195,0.052h47.518
			v92.85h-50.404c-10.988,0-19.896,8.908-19.896,19.896s8.908,19.896,19.896,19.896h140.601c10.988,0,19.896-8.908,19.896-19.896
			s-8.908-19.896-19.896-19.896h-50.404v-92.85h47.518c1.07,0,2.138-0.019,3.213-0.052c27.387-0.893,52.772-13.954,69.645-35.832
			C413.48,321.159,419.758,292.619,413.495,265.174z M330.982,39.793c-1.976,10.011-2.376,20.33-1.121,30.508H182.163
			c1.247-10.18,0.842-20.5-1.137-30.508H330.982z M364.76,319.172c-9.59,12.435-23.962,19.858-39.419,20.362
			c-0.641,0.021-1.284,0.031-1.93,0.031H188.582c-0.643,0-1.283-0.011-1.911-0.031c-15.467-0.503-29.841-7.924-39.431-20.361
			c-9.93-12.876-13.551-29.335-9.938-45.158c10.974-48.043,27.174-119.417,36.822-163.922h163.778
			c9.643,44.494,25.833,115.878,36.798,163.933C378.309,289.846,374.687,306.301,364.76,319.172z"
              />
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      );
      break;

    case "imperial":
      beericon = (
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 465 465"
          style={props.style}
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M354.737,119.358c-1.43-3.098-0.587-16.235,0.09-26.809c0.63-9.836,1.345-20.985,1.345-32.996c0-4.142-3.358-7.5-7.5-7.5
		h-21.204c-3.48-16.911-18.487-29.667-36.418-29.667c-4.818,0-9.521,0.922-13.914,2.705C267.762,9.623,251.008,0,232.497,0
		c-18.507,0-35.26,9.625-44.634,25.09c-4.392-1.782-9.095-2.705-13.913-2.705c-17.93,0-32.935,12.756-36.415,29.667h-21.208
		c-4.142,0-7.5,3.358-7.5,7.5c0,12.011,0.715,23.16,1.346,32.997c0.678,10.573,1.521,23.71,0.091,26.808
		c-17.965,23.559-18.132,53.646-0.474,80.608c2.051,6.16,4.811,42.995,7.731,81.959c3.246,43.314,7.285,97.221,13.099,153.15
		c1.07,10.275,12.719,17.879,35.612,23.245c18.112,4.245,42.266,6.68,66.266,6.68c23.082,0,47.035-2.431,65.718-6.668
		c23.946-5.431,36.101-13.04,37.161-23.258c6.076-58.427,10.101-116.446,13.04-158.81c2.51-36.185,4.883-70.392,6.805-76.313
		C372.872,172.987,372.698,142.909,354.737,119.358z M173.949,37.386c4.594,0,9.017,1.412,12.791,4.083
		c1.866,1.321,4.233,1.718,6.43,1.079c2.196-0.64,3.979-2.246,4.845-4.363C203.771,24.1,217.305,15,232.497,15
		c15.194,0,28.731,9.1,34.487,23.184c0.865,2.117,2.649,3.724,4.844,4.363c2.197,0.64,4.563,0.243,6.43-1.079
		c3.775-2.671,8.198-4.083,12.792-4.083c9.597,0,17.787,6.124,20.869,14.667H153.082C156.165,43.51,164.354,37.386,173.949,37.386z
		 M342.419,192.115c-3.269,4.937-4.53,19.13-8.968,83.111c-3.091,44.552-6.936,99.98-12.972,158.072
		c-0.959,1.688-7.65,6.65-28.299,11c-17.206,3.624-38.959,5.703-59.684,5.703c-22.099,0-43.617-2.051-60.592-5.774
		c-19.506-4.279-25.676-9.309-26.38-10.83c-5.784-55.669-9.811-109.405-13.047-152.593c-5.13-68.461-6.547-83.628-9.9-88.692
		c-14.494-21.867-14.603-45.112-0.297-63.777c4.814-6.285,4.079-17.75,2.861-36.746c-0.481-7.5-1.012-15.781-1.222-24.537H341.08
		c-0.21,8.755-0.741,17.036-1.222,24.537c-1.218,18.995-1.953,30.459,2.862,36.748C357.026,146.999,356.916,170.244,342.419,192.115
		z"
            />
            <path
              d="M324.887,90.656l0.002-0.027c0.264-4.134-2.873-7.686-7.007-7.95c-4.121-0.251-7.7,2.885-7.964,7.019
		c-0.626,9.779-1.181,18.461-0.851,26.34H156.3c0.117-6.468-0.349-13.403-0.857-20.909c-0.12-1.771-0.243-3.59-0.363-5.459
		c-0.265-4.134-3.831-7.26-7.964-7.005c-4.134,0.266-7.27,3.832-7.004,7.965c0.121,1.888,0.245,3.725,0.366,5.512
		c0.73,10.796,1.292,19.239,0.44,26.27c-0.03,0.201-0.054,0.405-0.068,0.611c-0.746,5.544-2.42,10.202-5.666,14.44
		c-10.663,13.911-10.697,30.38-0.099,46.37c5.549,8.38,6.405,17.956,11.429,90.395c0.274,3.956,3.568,6.981,7.474,6.981
		c0.174,0,0.35-0.006,0.527-0.019c4.132-0.287,7.25-3.869,6.963-8.001c-5.264-75.888-5.94-85.639-13.889-97.641
		c-6.984-10.538-7.153-20.281-0.499-28.962c3.744-4.887,6.066-10.041,7.445-15.547h156.68c1.516,5.512,3.937,10.644,7.686,15.539
		c6.391,8.337,5.905,17.81-1.488,28.963c-7.953,12.01-8.629,21.757-13.891,97.614c-0.543,7.828-1.044,15.286-1.534,22.593
		c-2,29.809-3.894,58.027-7.916,98.935c-11.742,2.496-37.553,5.435-61.576,5.435c-24.022,0-49.834-2.939-61.576-5.436
		c-3.658-37.208-5.528-63.533-7.412-91.491c-0.278-4.133-3.856-7.263-7.987-6.979c-4.133,0.278-7.257,3.854-6.979,7.987
		c1.979,29.373,3.944,56.958,7.967,97.165c0.293,2.933,2.278,5.422,5.072,6.362c10.373,3.489,42.903,7.392,70.915,7.392
		s60.542-3.901,70.915-7.39c2.794-0.94,4.778-3.429,5.072-6.362c4.403-43.987,6.379-73.436,8.472-104.614
		c0.49-7.296,0.99-14.743,1.532-22.56c5.023-72.408,5.878-81.98,11.432-90.368c10.895-16.437,11.21-32.905,0.89-46.37
		C322.58,126.708,323.448,113.138,324.887,90.656z"
            />
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      );
      break;
    case "mug":
      beericon = (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style={props.style}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path
                d="M389.691,164.238H355.39v-50.812v-11.873v-3.335h-0.138c-1.712-23.047-20.999-41.279-44.476-41.279h-12.771
			C294.233,24.92,266.926,0,233.909,0c-25.786,0-48.09,15.203-58.421,37.113c-8.398-11.284-21.835-18.607-36.951-18.607
			c-23.081,0-42.248,17.07-45.539,39.249C73.36,61.515,58.525,77.972,57.045,98.218h-0.132v3.335v11.873v318.543V512h70.818h15.208
			h55.61h15.208h55.61h15.208h70.818v-80.031v-26.547h34.301c36.058,0,65.394-29.336,65.394-65.394V229.632
			C455.085,193.574,425.75,164.238,389.691,164.238z M127.731,496.792h-55.61v-64.823c0-15.332,12.474-27.805,27.805-27.805
			s27.805,12.474,27.805,27.805V496.792z M198.548,496.792h-55.61v-64.823c0-15.332,12.474-27.805,27.805-27.805
			s27.805,12.474,27.805,27.805V496.792z M269.366,496.792h-55.61v-64.823c0-15.332,12.473-27.805,27.805-27.805
			c15.332,0,27.805,12.474,27.805,27.805V496.792z M340.183,496.792h-55.61v-64.823c0-15.332,12.473-27.805,27.805-27.805
			s27.805,12.474,27.805,27.805V496.792z M340.183,164.238V220v129.66v49.53c-7.504-6.375-17.21-10.233-27.805-10.233
			c-14.671,0-27.643,7.387-35.409,18.632c-7.766-11.245-20.738-18.632-35.409-18.632c-14.671,0-27.643,7.387-35.409,18.632
			c-7.766-11.245-20.738-18.632-35.409-18.632c-14.671,0-27.643,7.387-35.409,18.632c-7.766-11.245-20.738-18.632-35.409-18.632
			c-10.595,0-20.3,3.858-27.805,10.233V113.426h34.614v73.533c0.001,17.537,14.268,31.804,31.805,31.804
			c17.537,0,31.803-14.267,31.803-31.804v-73.533h32.603h0.001V98.218h-0.001h-47.81v88.741c0,9.151-7.445,16.596-16.595,16.596
			c-9.15,0-16.595-7.445-16.595-16.596V98.218H72.305c1.597-14.309,13.36-25.483,28.086-26.041l7.317-0.277l-0.001-7.616
			c0.14-16.881,13.915-30.571,30.829-30.571c16.999,0,30.828,13.83,30.828,30.829h15.208c0-27.204,22.132-49.335,49.335-49.335
			c27.204,0,49.335,22.131,49.335,49.335v7.604h27.532c15.087,0,27.558,11.421,29.217,26.071h-116.77h-0.001v15.208h0.001h116.96
			V164.238z M355.39,220h34.301c5.311,0,9.632,4.321,9.632,9.632v110.397c0,5.311-4.321,9.632-9.632,9.632H355.39V220z
			 M439.877,340.029c0,27.672-22.514,50.186-50.186,50.186H355.39v-25.346h34.301c13.697,0,24.839-11.143,24.839-24.84V229.632
			c0-13.696-11.142-24.839-24.839-24.839H355.39v-25.346h34.301c27.672,0,50.186,22.514,50.186,50.186V340.029z"
              />
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      );
      break;

    case "pilsner":
      beericon = (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style={props.style}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path
                d="M359.859,5.883C356.462,2.202,351.68,0,346.671,0H165.328c-5.009,0-9.79,2.202-13.186,5.883
			c-3.396,3.681-5.101,8.669-4.699,13.661l30.532,379.875c2.393,29.769-3.303,59.686-16.471,86.491
			c-2.732,5.561-2.402,12.256,0.874,17.516s9.033,8.574,15.23,8.574h156.786c6.197,0,11.954-3.306,15.231-8.566
			c3.277-5.26,3.607-11.892,0.874-17.455c-13.168-26.805-18.865-56.736-16.471-86.505L359.869,77.94
			c0.12-0.829,0.201-1.67,0.203-2.532l4.486-55.808C364.959,14.608,363.255,9.564,359.859,5.883z M307.738,476.112H204.261
			c8.382-25.121,11.647-52.543,9.485-79.432L189.369,93.308H322.63L298.254,396.68C296.092,423.569,299.356,450.991,307.738,476.112
			z M325.515,57.421H186.485l-1.713-21.533h142.457L325.515,57.421z"
              />
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      );
      break;
  }
  return beericon;
};

BeerIcons.propTypes = {};

export default BeerIcons;
