/*
 * Copyright (C) 2011-2024 Intel Corporation. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in
 *     the documentation and/or other materials provided with the
 *     distribution.
 *   * Neither the name of Intel Corporation nor the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
'use strict';

const swaggerAutogen = require('swagger-autogen')();

const outputFile = '../swagger.json';
const endpointsFiles = ['../src/routes/*.js', '../src/handlers/*.js'];

const doc = {
  info: {
    version:     '1.0.0',
    title:       'Quote Verification Service',
    description: 'Documentation automatically generated from comments in QVS code'
  },
  host:        'localhost:8799',
  basePath:    '/',
  schemes:     ['https'],
  consumes:    ['application/json'],
  produces:    ['application/json'],
  definitions: {
    AttestationVerificationReport: {
      id:                      '123456789',
      timestamp:               '2023-03-07T10:25:06Z',
      version:                 5,
      isvQuoteStatus:          'TCB_OUT_OF_DATE',
      isvQuoteBody:            'AwACAAAAAAAJAA0Ak5pyM/ecTKmUCg2zlX8GBwpMmllf9LxxjKAqXOfUHBcAAAAABwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAADAAAAAAAAAIzmaws6v/tSdHrNsTFmxI5zFvxjH4wr0ekGjAq1DDemAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5u0tV+IjIYPSpVgzJgDxwEf9YM81aeUo/X9XHg9C9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      nonce:                   'ABCDEABCDEABCDEABCDEABCDEABCDE12',      
      advisoryURL:             'https://security-center.intel.com',
      advisoryIDs:             ['INTEL-SA-68299', 'INTEL-SA-88618', 'INTEL-SA-89971'],
      tcbEvaluationDataNumber: 0,
      tcbDate:                 '2023-03-07T10:10:06Z',
      tcbComponentsOutOfDate:  [
        {
          category: 'CATEGORY01',
          type:     'TYPE01'
        }
      ],
      teeType:         'SGX_SCALABLE',
      attestationType: 'ECDSA',
      configuration:   [
        'DYNAMIC_PLATFORM'
      ]
    },
    AttestationEvidencePayload: {
      $isvQuote: 'AwACAAAAAAAJAA0Ak5pyM/ecTKmUCg2zlX8GBwpMmllf9LxxjKAqXOfUHBcAAAAABwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAADAAAAAAAAAIzmaws6v/tSdHrNsTFmxI5zFvxjH4wr0ekGjAq1DDemAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5u0tV+IjIYPSpVgzJgDxwEf9YM81aeUo/X9XHg9C9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARBAAAL4DbNh5c23M0qHcec48shvcN2wJ1pj+Qh+YuHpOW/Tx18WQ0ati+PacYRd9P8CZEdQuRrq0wN3cQt6ZCihk3ThcLKuqK+GKvjU4HAxYs96rOPFXzJoWvIS1zXkT2s5whkjjxzHHozs/sylsr9yEL6wMG2zREsAVVtjZusqSElOFBwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAAAAAAAAADAAAAAAAAAM4dqJrB9UqAclfE5Xx4FAy8ZlLU1YfWDwWDElonkr5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMT1d115ZQPpYTf3fGioKaAFasje1wFAsIGwlEkMV7/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM6zRJw81/jUrO3PUvc+cy8KaYAiBM8YLIwqqVdQwXQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKvl1zHTEtFywsTBJYGpxwqG3stXApr4KrPHxcoOMAFKBQ2cA0QnOdqcGlPf9PzbbEgt2CZCKisBDkjFOoEWm3CAAAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8FANwNAAAtLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0KTUlJRWpEQ0NCREtnQXdJQkFnSVVUNi94OWV6YlkvcHJYbEMybkRjMWJZdFBHZDB3Q2dZSUtvWkl6ajBFQXdJdwpjVEVqTUNFR0ExVUVBd3dhU1c1MFpXd2dVMGRZSUZCRFN5QlFjbTlqWlhOemIzSWdRMEV4R2pBWUJnTlZCQW9NCkVVbHVkR1ZzSUVOdmNuQnZjbUYwYVc5dU1SUXdFZ1lEVlFRSERBdFRZVzUwWVNCRGJHRnlZVEVMTUFrR0ExVUUKQ0F3Q1EwRXhDekFKQmdOVkJBWVRBbFZUTUI0WERUSXlNVEl4TkRFNU1qQXhOVm9YRFRJNU1USXhOREU1TWpBeApOVm93Y0RFaU1DQUdBMVVFQXd3WlNXNTBaV3dnVTBkWUlGQkRTeUJEWlhKMGFXWnBZMkYwWlRFYU1CZ0dBMVVFCkNnd1JTVzUwWld3Z1EyOXljRzl5WVhScGIyNHhGREFTQmdOVkJBY01DMU5oYm5SaElFTnNZWEpoTVFzd0NRWUQKVlFRSURBSkRRVEVMTUFrR0ExVUVCaE1DVlZNd1dUQVRCZ2NxaGtqT1BRSUJCZ2dxaGtqT1BRTUJCd05DQUFUVwp6ZGRvd2ljTG5JWXBEOTlEL25UUmFUN2NMb1laclVMZUVPRGhrN1RINk1yRXlsYk0vRUUwRW1SVjRPTEJQSS8vClhYYkxIM3VCSXhFeVJvWEdzaytvbzRJQ3B6Q0NBcU13SHdZRFZSMGpCQmd3Rm9BVTBPaXEyblhYK1M1SkY1ZzgKZXhSbDBOWHlXVTB3YkFZRFZSMGZCR1V3WXpCaG9GK2dYWVpiYUhSMGNITTZMeTloY0drdWRISjFjM1JsWkhObApjblpwWTJWekxtbHVkR1ZzTG1OdmJTOXpaM2d2WTJWeWRHbG1hV05oZEdsdmJpOTJNeTl3WTJ0amNtdy9ZMkU5CmNISnZZMlZ6YzI5eUptVnVZMjlrYVc1blBXUmxjakFkQmdOVkhRNEVGZ1FVYStoK2szajZ0NzhGNy9OV0lqTGQKeHliL1J2UXdEZ1lEVlIwUEFRSC9CQVFEQWdiQU1Bd0dBMVVkRXdFQi93UUNNQUF3Z2dIVEJna3Foa2lHK0UwQgpEUUVFZ2dIRU1JSUJ3REFlQmdvcWhraUcrRTBCRFFFQkJCQjA3Y3B1TWVvRzlpcDFjbjJEckxTZk1JSUJZd1lLCktvWklodmhOQVEwQkFqQ0NBVk13RUFZTEtvWklodmhOQVEwQkFnRUNBUWN3RUFZTEtvWklodmhOQVEwQkFnSUMKQVFjd0VBWUxLb1pJaHZoTkFRMEJBZ01DQVFBd0VBWUxLb1pJaHZoTkFRMEJBZ1FDQVFBd0VBWUxLb1pJaHZoTgpBUTBCQWdVQ0FRQXdFQVlMS29aSWh2aE5BUTBCQWdZQ0FRQXdFQVlMS29aSWh2aE5BUTBCQWdjQ0FRQXdFQVlMCktvWklodmhOQVEwQkFnZ0NBUUF3RUFZTEtvWklodmhOQVEwQkFna0NBUUF3RUFZTEtvWklodmhOQVEwQkFnb0MKQVFBd0VBWUxLb1pJaHZoTkFRMEJBZ3NDQVFBd0VBWUxLb1pJaHZoTkFRMEJBZ3dDQVFBd0VBWUxLb1pJaHZoTgpBUTBCQWcwQ0FRQXdFQVlMS29aSWh2aE5BUTBCQWc0Q0FRQXdFQVlMS29aSWh2aE5BUTBCQWc4Q0FRQXdFQVlMCktvWklodmhOQVEwQkFoQUNBUUF3RUFZTEtvWklodmhOQVEwQkFoRUNBUTB3SHdZTEtvWklodmhOQVEwQkFoSUUKRUFjSEFBQUFBQUFBQUFBQUFBQUFBQUF3RUFZS0tvWklodmhOQVEwQkF3UUNBQUF3RkFZS0tvWklodmhOQVEwQgpCQVFHQUhCcUVBQUFNQThHQ2lxR1NJYjRUUUVOQVFVS0FRQXdDZ1lJS29aSXpqMEVBd0lEU0FBd1JRSWdVRTA0CnNDaTlvVXpTNlNYd1ZQQkZtOTdzMmxyeGtYbmpwQTdST1lJQXJzOENJUURiTjZPc01OYWtidktYY2lQM2dOdEgKVklkZE5xMWxkRkJOTmpEUHZjM0RXdz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0KLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNtRENDQWo2Z0F3SUJBZ0lWQU5Eb3F0cDExL2t1U1JlWVBIc1VaZERWOGxsTk1Bb0dDQ3FHU000OUJBTUMKTUdneEdqQVlCZ05WQkFNTUVVbHVkR1ZzSUZOSFdDQlNiMjkwSUVOQk1Sb3dHQVlEVlFRS0RCRkpiblJsYkNCRApiM0p3YjNKaGRHbHZiakVVTUJJR0ExVUVCd3dMVTJGdWRHRWdRMnhoY21FeEN6QUpCZ05WQkFnTUFrTkJNUXN3CkNRWURWUVFHRXdKVlV6QWVGdzB4T0RBMU1qRXhNRFV3TVRCYUZ3MHpNekExTWpFeE1EVXdNVEJhTUhFeEl6QWgKQmdOVkJBTU1Ha2x1ZEdWc0lGTkhXQ0JRUTBzZ1VISnZZMlZ6YzI5eUlFTkJNUm93R0FZRFZRUUtEQkZKYm5SbApiQ0JEYjNKd2IzSmhkR2x2YmpFVU1CSUdBMVVFQnd3TFUyRnVkR0VnUTJ4aGNtRXhDekFKQmdOVkJBZ01Ba05CCk1Rc3dDUVlEVlFRR0V3SlZVekJaTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEEwSUFCTDlxK05NcDJJT2cKdGRsMWJrL3VXWjUrVEdRbThhQ2k4ejc4ZnMrZktDUTNkK3VEelhuVlRBVDJaaERDaWZ5SXVKd3ZOM3dOQnA5aQpIQlNTTUpNSnJCT2pnYnN3Z2Jnd0h3WURWUjBqQkJnd0ZvQVVJbVVNMWxxZE5JbnpnN1NWVXI5UUd6a25CcXd3ClVnWURWUjBmQkVzd1NUQkhvRVdnUTRaQmFIUjBjSE02THk5alpYSjBhV1pwWTJGMFpYTXVkSEoxYzNSbFpITmwKY25acFkyVnpMbWx1ZEdWc0xtTnZiUzlKYm5SbGJGTkhXRkp2YjNSRFFTNWtaWEl3SFFZRFZSME9CQllFRk5EbwpxdHAxMS9rdVNSZVlQSHNVWmREVjhsbE5NQTRHQTFVZER3RUIvd1FFQXdJQkJqQVNCZ05WSFJNQkFmOEVDREFHCkFRSC9BZ0VBTUFvR0NDcUdTTTQ5QkFNQ0EwZ0FNRVVDSVFDSmdUYnRWcU95WjFtM2pxaUFYTTZRWWE2cjVzV1MKNHkvRzd5OHVJSkd4ZHdJZ1JxUHZCU0t6elFhZ0JMUXE1czVBNzBwZG9pYVJKOHovMHVEejROZ1Y5MWs9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0KLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNqekNDQWpTZ0F3SUJBZ0lVSW1VTTFscWROSW56ZzdTVlVyOVFHemtuQnF3d0NnWUlLb1pJemowRUF3SXcKYURFYU1CZ0dBMVVFQXd3UlNXNTBaV3dnVTBkWUlGSnZiM1FnUTBFeEdqQVlCZ05WQkFvTUVVbHVkR1ZzSUVOdgpjbkJ2Y21GMGFXOXVNUlF3RWdZRFZRUUhEQXRUWVc1MFlTQkRiR0Z5WVRFTE1Ba0dBMVVFQ0F3Q1EwRXhDekFKCkJnTlZCQVlUQWxWVE1CNFhEVEU0TURVeU1URXdORFV4TUZvWERUUTVNVEl6TVRJek5UazFPVm93YURFYU1CZ0cKQTFVRUF3d1JTVzUwWld3Z1UwZFlJRkp2YjNRZ1EwRXhHakFZQmdOVkJBb01FVWx1ZEdWc0lFTnZjbkJ2Y21GMAphVzl1TVJRd0VnWURWUVFIREF0VFlXNTBZU0JEYkdGeVlURUxNQWtHQTFVRUNBd0NRMEV4Q3pBSkJnTlZCQVlUCkFsVlRNRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVDNm5Fd01ESVlaT2ovaVBXc0N6YUVLaTcKMU9pT1NMUkZoV0dqYm5CVkpmVm5rWTR1M0lqa0RZWUwwTXhPNG1xc3lZamxCYWxUVll4RlAyc0pCSzV6bEtPQgp1ekNCdURBZkJnTlZIU01FR0RBV2dCUWlaUXpXV3AwMGlmT0R0SlZTdjFBYk9TY0dyREJTQmdOVkhSOEVTekJKCk1FZWdSYUJEaGtGb2RIUndjem92TDJObGNuUnBabWxqWVhSbGN5NTBjblZ6ZEdWa2MyVnlkbWxqWlhNdWFXNTAKWld3dVkyOXRMMGx1ZEdWc1UwZFlVbTl2ZEVOQkxtUmxjakFkQmdOVkhRNEVGZ1FVSW1VTTFscWROSW56ZzdTVgpVcjlRR3prbkJxd3dEZ1lEVlIwUEFRSC9CQVFEQWdFR01CSUdBMVVkRXdFQi93UUlNQVlCQWY4Q0FRRXdDZ1lJCktvWkl6ajBFQXdJRFNRQXdSZ0loQU9XLzVRa1IrUzlDaVNEY05vb3dMdVBSTHNXR2YvWWk3R1NYOTRCZ3dUd2cKQWlFQTRKMGxySG9NcytYbzVvL3NYNk85UVd4SFJBdlpVR09kUlE3Y3ZxUlhhcUk9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0KAA==',
      nonce:     'ABCDEABCDEABCDEABCDEABCDEABCDE12'
    },
    PositiveHealthReport: {
      status:          'OK',
      version:         '1.0.0',
      lastChecked:     '2023-03-07T10:30:29.282Z',
      componentStatus: {
        VerificationCryptoService: {
          status:      'OK',
          version:     '0.0.1',
          lastChecked: '2023-03-07T11:22:22.690Z'
        },
        QuoteVerificationLibrary: {
          status:      'OK',
          version:     '1.0.0', 
          lastChecked: '2023-03-07T11:22:22.686Z'
        }
      },
    },
    NegativeHealthReport: {
      status:          'FAILED',
      version:         '1.0.0',
      lastChecked:     '2023-03-07T10:30:29.282Z',
      componentStatus: {
        VerificationCryptoService: {
          status:      'FAILED',
          version:     '0.0.1',
          lastChecked: '2023-03-07T11:22:22.690Z'
        },
        QuoteVerificationLibrary: {
          status:      'OK',
          version:     '1.0.0',
          lastChecked: '2023-03-07T11:22:22.686Z'
        }
      }
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);
