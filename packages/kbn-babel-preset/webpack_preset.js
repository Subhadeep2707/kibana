/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

module.exports = () => {
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          useBuiltIns: 'entry',
          modules: false,
          // Please read the explanation for this
          // in node_preset.js
          corejs: '3.2.1',
        },
      ],
      require('./common_preset'),
    ],
    plugins: [
      require.resolve('@babel/plugin-transform-modules-commonjs'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      [
        require.resolve('babel-plugin-styled-components'),
        {
          fileName: false,
        },
      ],
    ],
    // NOTE: we can enable this by default for everything as soon as we only have one instance
    // of lodash across the entire project. For now we are just enabling it for siem
    // as they are extensively using the lodash v4
    overrides: [
      {
        test: [/x-pack[\/\\]legacy[\/\\]plugins[\/\\]siem[\/\\]public/],
        plugins: [
          [
            require.resolve('babel-plugin-transform-imports'),
            {
              'lodash/?(((\\w*)?/?)*)': {
                transform: 'lodash/${1}/${member}',
                preventFullImport: false,
              },
            },
          ],
        ],
      },
    ],
  };
};
