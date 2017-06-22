/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { QuoteService } from './actuality.service';

describe('QuoteService', () => {
  let quoteService: QuoteService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ]
    });
  });

  beforeEach(inject([
    QuoteService,
    MockBackend
  ], (_quoteService: QuoteService,
      _mockBackend: MockBackend) => {

    quoteService = _quoteService;
    mockBackend = _mockBackend;
  }));

  describe('getRandomQuote', () => {
    it('should return a random Chuck Norris quote', () => {
      // Arrange
      const mockQuote = 'a random quote';
      const response = new Response(new ResponseOptions({
        body: { value: mockQuote }
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomQuoteSubscription = quoteService.getRandomQuote({ category: 'toto' });

      // Assert
      randomQuoteSubscription.subscribe((quote: string) => {
        expect(quote).toEqual(mockQuote);
      });
    });

    it('should return a string in case of error', () => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomQuoteSubscription = quoteService.getRandomQuote({ category: 'toto' });

      // Assert
      randomQuoteSubscription.subscribe((quote: string) => {
        expect(typeof quote).toEqual('string');
      });
    });
  });
});
